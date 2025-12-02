import type { Project, TranslationFilePath } from '../../../types/index.js';

export function getOwnTranslations(project: Project): Set<TranslationFilePath> {
  const filePaths = new Set<TranslationFilePath>();

  project.translationFiles.forEach((data, filePath) => {
    if (data.isInternal) {
      filePaths.add(filePath);
    }
  });

  return filePaths;
}
