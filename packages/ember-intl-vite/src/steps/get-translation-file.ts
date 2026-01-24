import { EOL } from 'node:os';

import type { Locale, Project, TranslationObject } from '../types/index.js';

export function getTranslationFile(
  translations: Project['translations'],
  locale: Locale,
): string | undefined {
  const keyToData = translations.get(locale);

  if (keyToData === undefined) {
    throw new Error(
      `ERROR: Unable to find translations. (unknown locale: ${locale})`,
    );
  }

  const translationObject: TranslationObject = {};

  keyToData.forEach((data, key) => {
    translationObject[key] = data.message;
  });

  return [
    `const translations = ${JSON.stringify(translationObject)};`,
    `export default translations;`,
  ].join(EOL);
}
