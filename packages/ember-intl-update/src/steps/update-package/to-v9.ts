import type { Options, Todos } from '../../types/index.js';
import { updatePackageJson } from './to-v9/index.js';

export function updatePackageToV9(options: Options): Todos {
  const todosAll: Todos[] = [];

  updatePackageJson(options);

  return todosAll.flat();
}
