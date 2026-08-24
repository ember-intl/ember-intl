import type { Options, Todos } from '../../types/index.js';
import { updatePackageJson } from './to-v7/index.js';

export function updatePackageToV7(options: Options): Todos {
  const todosAll: Todos[] = [];

  updatePackageJson(options);

  return todosAll.flat();
}
