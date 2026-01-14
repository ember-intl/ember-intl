import type { Project } from '../../../types/index.js';

export function getLocales(project: Project): Set<string> {
  const locales = new Set<string>();

  project.translationFiles.forEach((data) => {
    locales.add(data.locale);
  });

  return locales;
}
