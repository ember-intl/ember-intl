import type { Project } from '../../types/index.js';

export function findLocales(
  translationFiles: Project['translationFiles'],
): string[] {
  const locales = new Set<string>();

  translationFiles.forEach((data) => {
    locales.add(data.locale);
  });

  return Array.from(locales).sort();
}
