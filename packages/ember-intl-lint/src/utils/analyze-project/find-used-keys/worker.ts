import { parentPort, workerData } from 'node:worker_threads';

import { runTask } from '@codemod-utils/threads';

import { findTranslationKeys } from './find-translation-keys.js';

type WorkerData = {
  datasets: Parameters<typeof findTranslationKeys>[];
};

const WORKER_ID = `EMBER_INTL_LINT_ANALYZE_PROJECT_${Math.random().toString(16).slice(2)}`;

const { datasets } = workerData as WorkerData;

runTask(findTranslationKeys, datasets)
  .then((results) => {
    process.env[WORKER_ID] = `${performance.now()}`;

    parentPort?.postMessage(results);
  })
  .catch((error) => {
    throw error;
  });
