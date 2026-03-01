import { availableParallelism } from 'node:os';

import { runTask, type Task } from './run-task.js';

const MIN_NUM_ITEMS_PER_WORKER = 100;

function batchDatas<T>(items: T[], numItemsPerWorker: number): [T[], T[][]] {
  const numItems = items.length;
  const batches: T[][] = [];

  for (let i = 0; i < numItems; i += numItemsPerWorker) {
    batches.push(items.slice(i, i + numItemsPerWorker));
  }

  const batchForMainThread: T[] = batches.shift() ?? [];

  return [batchForMainThread, batches];
}

export async function parallelize<T, U>(
  task: Task<T, U>,
  options: {
    items: T[];
    runWorker: (subitems: T[]) => Promise<U[]>;
  },
): Promise<U[]> {
  const { items, runWorker } = options;
  const numItems = items.length;

  if (numItems < MIN_NUM_ITEMS_PER_WORKER) {
    return await runTask(task, items);
  }

  const numWorkers = availableParallelism();

  const numItemsPerWorker = Math.max(
    Math.ceil(numItems / numWorkers),
    MIN_NUM_ITEMS_PER_WORKER,
  );

  const [batchForMainThread, batchesForWorkers] = batchDatas(
    items,
    numItemsPerWorker,
  );

  const [resultsForMainThread, ...resultsForWorkers] = await Promise.all([
    runTask(task, batchForMainThread),
    ...batchesForWorkers.map((batch) => {
      return runWorker(batch);
    }),
  ]);

  return [...resultsForMainThread, ...resultsForWorkers.flat()];
}
