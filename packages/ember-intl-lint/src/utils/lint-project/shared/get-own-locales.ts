import type { Project } from '../../../types/index.js';

export function getOwnLocales(project: Project): Set<string> {
  const locales = new Set<string>();

  project.translationFiles.forEach((data) => {
    if (data.isInternal) {
      locales.add(data.locale);
    }
  });

  return locales;
}
