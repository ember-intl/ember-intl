import { findFiles } from '@codemod-utils/files';

export function findUserConfig(projectRoot: string): string | undefined {
  const filePaths = findFiles('ember-intl.config.{js,mjs}', {
    projectRoot,
  });

  if (filePaths.length === 0) {
    return undefined;
  }

  if (filePaths.length > 1) {
    throw new Error('Found multiple config files');
  }

  return filePaths[0]!;
}
