import { relative, sep as separator } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type { TranslationFilePath } from '../../../../types/index.js';

type Data = {
  filePath: TranslationFilePath;
  namespaceKeys: boolean;
  translationsDir: string;
};

export function getPrefix(data: Data): string | undefined {
  if (!data.namespaceKeys) {
    return undefined;
  }

  const { dir } = parseFilePath(data.filePath);
  const relativePath = relative(data.translationsDir, dir);

  if (relativePath === '') {
    return '';
  }

  return `${relativePath.replaceAll(separator, '.')}.`;
}
