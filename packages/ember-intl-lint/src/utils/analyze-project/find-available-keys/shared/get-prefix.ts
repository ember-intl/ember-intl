import { relative, sep as separator } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type { TranslationFilePath } from '../../../../types/index.js';

type Data = {
  filePath: TranslationFilePath;
  namespaceKeys: boolean;
  rootDir: string;
};

export function getPrefix(data: Data): string | undefined {
  if (!data.namespaceKeys) {
    return undefined;
  }

  const { dir } = parseFilePath(data.filePath);
  const prefix = relative(data.rootDir, dir).replaceAll(separator, '.');

  return `${prefix}.`;
}
