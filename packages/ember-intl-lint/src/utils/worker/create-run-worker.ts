import { SHARE_ENV, Worker } from 'node:worker_threads';

export function createRunWorker<U>(
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
