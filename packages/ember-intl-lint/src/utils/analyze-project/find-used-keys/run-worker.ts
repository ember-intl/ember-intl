import { SHARE_ENV, Worker } from 'node:worker_threads';

import type { TranslationKey } from '../../../types/index.js';

type AbsoluteFilePath = string;

export function runWorker(
  items: AbsoluteFilePath[],
): Promise<TranslationKey[][]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./worker/index.js', import.meta.url), {
      env: SHARE_ENV,
      workerData: {
        items,
      },
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
