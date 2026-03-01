import { availableParallelism } from 'node:os';

import { runTaskOnItems } from './run-task-on-items.js';

const MIN_NUM_ITEMS_PER_WORKER = 100;

function batchItems<T>(items: T[]): [T[], T[][]] {
  const numItems = items.length;
  const numWorkers = availableParallelism();

  const numItemsPerWorker = Math.max(
    Math.ceil(numItems / numWorkers),
    MIN_NUM_ITEMS_PER_WORKER,
  );

  const batches: T[][] = [];

  for (let i = 0; i < numItems; i += numItemsPerWorker) {
    batches.push(items.slice(i, i + numItemsPerWorker));
  }

  const batchForMainThread: T[] = batches.shift() ?? [];

  return [batchForMainThread, batches];
}

export async function processItems<T, U>(data: {
  items: T[];
  runWorker: (subitems: T[]) => Promise<U[]>;
  task: (item: T) => U | Promise<U>;
}): Promise<U[]> {
  const { items, runWorker, task } = data;

  if (items.length < MIN_NUM_ITEMS_PER_WORKER) {
    return await runTaskOnItems(task, items);
  }

  const [batchForMainThread, batchesForWorkers] = batchItems(items);

  const [resultsForMainThread, ...resultsForWorkers] = await Promise.all([
    runTaskOnItems(task, batchForMainThread),
    ...batchesForWorkers.map((batch) => {
      return runWorker(batch);
    }),
  ]);

  return [...resultsForMainThread, ...resultsForWorkers.flat()];
}
