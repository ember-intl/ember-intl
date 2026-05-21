import type { Options, Todos } from '../../types/index.js';
import { updateDependencies } from './to-v7/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function updatePackageToV7(options: Options): Promise<Todos> {
  const todosAll: Todos[] = [];

  updateDependencies(options);

  return todosAll.flat();
}
