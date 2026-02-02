import { cpus } from 'node:os';
import { join } from 'node:path';
import { SHARE_ENV, Worker } from 'node:worker_threads';

import { findFiles } from '@codemod-utils/files';

import type { Options, Project, TranslationKey } from '../../types/index.js';
import { findTranslationKeys } from '../../utils/analyze-project/find-used-keys/index.js';
import { runTaskOnItems } from '../../utils/worker/index.js';

type WorkerData = {
  items: string[];
};

function runWorker(workerData: WorkerData): Promise<TranslationKey[][]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL(
        '../../utils/analyze-project/find-used-keys/worker/index.js',
        import.meta.url,
      ),
      {
        env: SHARE_ENV,
        workerData,
      },
    );

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

export async function findUsedKeys(
  options: Options,
): Promise<Project['usedKeys']> {
  const { projectRoot, src } = options;

  const filePaths = findFiles(`${src}/**/*.{gjs,gts,hbs,js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  });

  const items = filePaths.map((filePath) => {
    return join(projectRoot, filePath);
  });

  const MIN_NUM_ITEMS_PER_WORKER = 100;
  const numItems = items.length;

  let allUsedKeys: TranslationKey[][];

  if (numItems < MIN_NUM_ITEMS_PER_WORKER) {
    allUsedKeys = await runTaskOnItems(findTranslationKeys, items);
  } else {
    const numWorkers = Math.max(cpus().length - 1, 1);

    const numItemsPerWorker = Math.max(
      Math.ceil(numItems / numWorkers),
      MIN_NUM_ITEMS_PER_WORKER,
    );

    const batches: string[][] = [];

    for (let i = 0; i < numItems; i += numItemsPerWorker) {
      batches.push(items.slice(i, i + numItemsPerWorker));
    }

    const batchForMainThread: string[] = batches.shift() ?? [];

    const promiseForMainThread = runTaskOnItems(
      findTranslationKeys,
      batchForMainThread,
    );

    const promisesForWorkers = batches.map((batch) => {
      return runWorker({
        items: batch,
      });
    });

    const [resultsForMainThread, ...resultsForWorkers] = await Promise.all([
      promiseForMainThread,
      ...promisesForWorkers,
    ]);

    allUsedKeys = [...resultsForMainThread, ...resultsForWorkers.flat()];
  }

  return new Set(allUsedKeys.flat().sort());
}
