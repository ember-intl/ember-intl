import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options, Project } from '../../types/index.js';
import {
  inJson,
  inYaml,
} from '../../utils/analyze-project/merge-translation-files/index.js';
import { findIcuArguments } from '../../utils/icu-message/find-icu-arguments.js';

export function findAvailableKeys(
  translationFiles: Project['translationFiles'],
  locales: Project['locales'],
  options: Options,
): Project['availableKeys'] {
  const { config, projectRoot } = options;
  const availableKeys: Project['availableKeys'] = new Map();

  translationFiles.forEach((data, filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const parser = data.format === 'json' ? inJson : inYaml;

    const translationObject = parser(file, {
      filePath,
      namespaceKeys: config.buildOptions.wrapTranslationsWithNamespace,
      translationsDir: data.translationsDir,
    });

    for (const [key, message] of Object.entries(translationObject)) {
      const icuArguments = findIcuArguments(message);

      if (!availableKeys.has(key)) {
        availableKeys.set(key, new Map());
      }

      const mapping = availableKeys.get(key)!;

      mapping.set(data.locale, {
        filePath,
        icuArguments,
        message,
      });
    }
  });

  const { fallbackLocale } = config.buildOptions;

  if (!fallbackLocale) {
    return new Map(Array.from(availableKeys).sort());
  }

  const newAvailableKeys: Project['availableKeys'] = new Map();

  availableKeys.forEach((mapping, key) => {
    const newMapping: typeof mapping = new Map();

    locales.forEach((locale) => {
      const data = mapping.get(locale) ?? mapping.get(fallbackLocale);

      if (data) {
        newMapping.set(locale, data);
      }
    });

    newAvailableKeys.set(key, newMapping);
  });

  return new Map(Array.from(newAvailableKeys).sort());
}
