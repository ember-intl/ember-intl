import type { Options, Todos } from '../../types/index.js';
import {
  renameFormatRelative,
  updateEmberIntlConfig,
  updateFormatsConfig,
  updatePackageJson,
} from './to-v8/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function updatePackageToV8(options: Options): Promise<Todos> {
  const todosAll: Todos[] = [];

  todosAll.push(updatePackageJson(options));
  updateEmberIntlConfig(options);
  todosAll.push(updateFormatsConfig(options));
  renameFormatRelative(options);

  return todosAll.flat();
}
