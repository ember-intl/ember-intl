import { availableParallelism } from 'node:os';
import { SHARE_ENV, Worker } from 'node:worker_threads';

import { runTask, type Task } from './run-task.js';

const MIN_NUM_TASKS_PER_WORKER = 100;

function batchDatas<T>(
  taskDatas: T[],
  numTasksPerWorker: number,
): [T[], T[][]] {
  const numTasks = taskDatas.length;
  const workerDatas: T[][] = [];

  for (let i = 0; i < numTasks; i += numTasksPerWorker) {
    workerDatas.push(taskDatas.slice(i, i + numTasksPerWorker));
  }

  const mainThreadData: T[] = workerDatas.shift() ?? [];

  return [mainThreadData, workerDatas];
}

function createRunWorker<U>(
  workerFilePath: string,
): <T>(taskDatas: T[]) => Promise<U[]> {
  function runWorker<T>(taskDatas: T[]): Promise<U[]> {
    return new Promise((resolve, reject) => {
      const workerUrl = new URL(workerFilePath, import.meta.url);

      const worker = new Worker(workerUrl, {
        env: SHARE_ENV,
        workerData: {
          taskDatas,
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

  return runWorker;
}

export async function parallelize<T extends unknown[], U>(
  task: Task<T, U>,
  options: {
    taskDatas: T[];
    workerFilePath: string;
  },
): Promise<U[]> {
  const { taskDatas, workerFilePath } = options;
  const numTasks = taskDatas.length;

  if (numTasks < MIN_NUM_TASKS_PER_WORKER) {
    return await runTask(task, taskDatas);
  }

  const numWorkers = availableParallelism();

  const numTasksPerWorker = Math.max(
    Math.ceil(numTasks / numWorkers),
    MIN_NUM_TASKS_PER_WORKER,
  );

  const [mainThreadData, workerDatas] = batchDatas(
    taskDatas,
    numTasksPerWorker,
  );

  const runWorker = createRunWorker<U>(workerFilePath);

  const [mainThreadResults, ...workerResults] = await Promise.all([
    runTask(task, mainThreadData),
    ...workerDatas.map(runWorker),
  ]);

  return [...mainThreadResults, ...workerResults.flat()];
}
