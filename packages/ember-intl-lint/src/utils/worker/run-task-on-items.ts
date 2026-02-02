const MAX_NUM_RUNNING_TASKS = 10;

export async function runTaskOnItems<T, U>(
  task: (item: T) => U | Promise<U>,
  items: T[],
): Promise<U[]> {
  const runningTasks = new Set();
  const results: U[] = [];

  let firstCaughtError: Error | undefined = undefined;

  async function runTask(item: T): Promise<U> {
    const promise = task(item);
    runningTasks.add(promise);

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
      runningTasks.delete(promise);
    }
  }

  async function spawnTasks(): Promise<void> {
    for (const item of items) {
      // Don't start new tasks if an error has occurred
      if (firstCaughtError) {
        break;
      }

      if (runningTasks.size > MAX_NUM_RUNNING_TASKS) {
        try {
          // Wait for at least one task to complete before spawning more
          await Promise.race(runningTasks);
        } catch {
          // Error is caught here, but handled in `runTask`.
          // Continue to process the remaining tasks.
        }
      }

      // Don't use `await` here. Just spawn the task.
      runTask(item).catch(() => {
        // Errors are already handled in `runTask`.
        // This catch is to prevent `unhandled rejection`` warnings.
      });
    }

    try {
      // Wait for all remaining tasks to complete
      if (runningTasks.size > 0) {
        await Promise.all(runningTasks);
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
