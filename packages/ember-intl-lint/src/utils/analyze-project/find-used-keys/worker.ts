import { parentPort, workerData } from 'node:worker_threads';

import type { Options } from '../../../types/index.js';
import { runTask } from '../../worker/index.js';
import { findTranslationKeys } from './find-translation-keys.js';

type WorkerData = {
  taskDatas: [string, Options][];
};

const WORKER_ID = `EMBER_INTL_LINT_ANALYZE_PROJECT_${Math.random().toString(16).slice(2)}`;

const { taskDatas } = workerData as WorkerData;

runTask(findTranslationKeys, taskDatas)
  .then((results) => {
    process.env[WORKER_ID] = `${performance.now()}`;

    parentPort?.postMessage(results);
  })
  .catch((error) => {
    throw error;
  });
