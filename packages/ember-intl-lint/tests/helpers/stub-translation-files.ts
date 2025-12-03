import type { Project } from '../../src/types/index.js';

export function stubTranslationFiles(): Project['translationFiles'] {
  const translationFiles: Project['translationFiles'] = new Map([
    [
      'translations/de-de.json',
      {
        format: 'json',
        isInternal: true,
        locale: 'de-de',
      },
    ],
    [
      'translations/en-us.json',
      {
        format: 'json',
        isInternal: true,
        locale: 'en-us',
      },
    ],
    [
      'node_modules/my-v1-addon/translations/de-de.json',
      {
        format: 'json',
        isInternal: false,
        locale: 'de-de',
      },
    ],
    [
      'node_modules/my-v1-addon/translations/en-us.json',
      {
        format: 'json',
        isInternal: false,
        locale: 'en-us',
      },
    ],
    [
      'node_modules/my-v2-addon/translations/de-de.json',
      {
        format: 'json',
        isInternal: false,
        locale: 'de-de',
      },
    ],
    [
      'node_modules/my-v2-addon/translations/en-us.json',
      {
        format: 'json',
        isInternal: false,
        locale: 'en-us',
      },
    ],
  ]);

  return translationFiles;
}
