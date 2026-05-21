import type { Options, Todos } from '../../types/index.js';
import { updateDependencies, updateEmberIntlConfig } from './to-v8/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function updatePackageToV8(options: Options): Promise<Todos> {
  const todosAll: Todos[] = [];

  updateDependencies(options);
  updateEmberIntlConfig(options);

  return todosAll.flat();
}
