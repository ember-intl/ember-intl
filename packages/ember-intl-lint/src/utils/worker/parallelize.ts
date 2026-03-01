import { availableParallelism } from 'node:os';

import { createRunWorker } from './create-run-worker.js';
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
