import { EOL } from 'node:os';

import type { Locale, Project, TranslationJson } from '../types/index.js';

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

  const translationJson: TranslationJson = {};

  keyToData.forEach((data, key) => {
    translationJson[key] = data.message;
  });

  return [
    `const translations = ${JSON.stringify(translationJson)};`,
    `export default translations;`,
  ].join(EOL);
}
