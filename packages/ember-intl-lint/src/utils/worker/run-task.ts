const MAX_NUM_TASKS_RUNNING = 10;

export type Task<T extends unknown[], U> = (...data: T) => U | Promise<U>;

export async function runTask<T extends unknown[], U>(
  task: Task<T, U>,
  taskDatas: T[],
): Promise<U[]> {
  const tasksRunning = new Set();
  const results: U[] = [];

  let firstCaughtError: Error | undefined = undefined;

  async function runTask(...data: T): Promise<U> {
    const promise = task(...data);
    tasksRunning.add(promise);

    try {
      const resolved = await promise;
      results.push(resolved);

      return resolved;
    } catch (error) {
      if (!firstCaughtError) {
        firstCaughtError = error as Error;
      }

      // Re-throw to reject `promise`
      throw error;
    } finally {
      tasksRunning.delete(promise);
    }
  }

  async function spawnTasks(): Promise<void> {
    for (const data of taskDatas) {
      // Don't start new tasks if an error has occurred
      if (firstCaughtError) {
        break;
      }

      if (tasksRunning.size > MAX_NUM_TASKS_RUNNING) {
        try {
          // Wait for at least one task to complete before spawning more
          await Promise.race(tasksRunning);
        } catch {
          // Error is caught here, but handled in `runTask`.
          // Continue to process the remaining tasks.
        }
      }

      // Don't use `await` here. Just spawn the task.
      runTask(...data).catch(() => {
        // Errors are already handled in `runTask`.
        // This catch is to prevent `unhandled rejection`` warnings.
      });
    }

    try {
      // Wait for all remaining tasks to complete
      if (tasksRunning.size > 0) {
        await Promise.all(tasksRunning);
      }
    } catch {
      // Error is caught here, but `firstCaughtError` has already been
      // defined in `runTask`
    }
  }

  await spawnTasks();

  // If an error occurred, reject with it
  if (firstCaughtError) {
    throw firstCaughtError as Error;
  }

  return results;
}
