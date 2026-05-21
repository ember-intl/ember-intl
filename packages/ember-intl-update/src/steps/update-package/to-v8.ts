import type { Options, Todos } from '../../types/index.js';
import {
  renameFormatRelative,
  updateEmberIntlConfig,
  updateFormatsConfig,
  updatePackageJson,
} from './to-v8/index.js';

export async function updatePackageToV8(options: Options): Promise<Todos> {
  const todosAll: Todos[] = [];

  todosAll.push(updatePackageJson(options));
  updateEmberIntlConfig(options);
  todosAll.push(updateFormatsConfig(options));
  await renameFormatRelative(options);

  return todosAll.flat();
}
