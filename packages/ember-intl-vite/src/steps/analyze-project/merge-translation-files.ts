import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options, Project } from '../../types/index.js';
import {
  inJson,
  inYaml,
} from '../../utils/analyze-project/find-translations/index.js';

export function mergeTranslationFiles(
  translationFiles: Project['translationFiles'],
  options: Options,
): Project['translations'] {
  const { config, projectRoot } = options;
  const { buildOptions } = config;

  const translations: Project['translations'] = new Map();

  translationFiles.forEach((data, filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const parser = data.format === 'json' ? inJson : inYaml;

    const translationObject = parser(file, {
      filePath,
      namespaceKeys: buildOptions.wrapTranslationsWithNamespace,
      translationsDir: data.translationsDir,
    });

    const newTranslationObject = Object.assign(
      {},
      translations.get(data.locale),
      translationObject,
    );

    translations.set(data.locale, newTranslationObject);
  });

  return translations;
}
