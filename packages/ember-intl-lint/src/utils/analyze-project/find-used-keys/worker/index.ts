import { parentPort, workerData } from 'node:worker_threads';

import type { TranslationKey } from '../../../../types/index.js';
import { runTaskOnItems } from '../../../worker/index.js';
import { findTranslationKeys } from '../find-translation-keys.js';

type WorkerData = {
  items: string[];
};

const WORKER_ID = `WORKER_FOR_ANALYZE_PROJECT_FIND_USED_KEYS_${Math.random().toString(16).slice(2)}`;

async function processFiles(): Promise<TranslationKey[][]> {
  const { items } = workerData as WorkerData;

  return await runTaskOnItems(findTranslationKeys, items);
}

processFiles()
  .then((results) => {
    process.env[WORKER_ID] = `${performance.now()}`;
    parentPort!.postMessage(results);
  })
  .catch((error) => {
    throw error;
  });
