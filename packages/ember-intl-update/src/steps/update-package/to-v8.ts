import type { Options, Todos } from '../../types/index.js';
import {
  updateEmberIntlConfig,
  updateFormatsConfig,
  updatePackageJson,
} from './to-v8/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function updatePackageToV8(options: Options): Promise<Todos> {
  const todosAll: Todos[] = [];

  updatePackageJson(options);
  updateEmberIntlConfig(options);
  todosAll.push(updateFormatsConfig(options));

  return todosAll.flat();
}
