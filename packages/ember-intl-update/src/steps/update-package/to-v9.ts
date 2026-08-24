import type { Options, Todos } from '../../types/index.js';
import {
  removeNestedTranslationJson,
  removeSpacesInTranslationFolderName,
  updateEmberIntlConfig,
  updatePackageJson,
} from './to-v9/index.js';

export async function updatePackageToV9(options: Options): Promise<Todos> {
  const todosAll: Todos[] = [];

  updatePackageJson(options);
  updateEmberIntlConfig(options);
  removeSpacesInTranslationFolderName(options);
  await removeNestedTranslationJson(options);

  return todosAll.flat();
}
