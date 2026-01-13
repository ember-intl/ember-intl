import { parseFilePath } from '@codemod-utils/files';
import { join } from 'node:path';

import type { Locale, Options } from '../types/index.js';

const VIRTUAL_MODULE_ID = 'virtual:ember-intl/translations' as const;

const resolvedModuleIds = new Set<string>();
const supportedExtensions = new Set(['.json', '.yaml', '.yml']);

function _getLocale(moduleId: string): Locale {
  return moduleId.replace(`${VIRTUAL_MODULE_ID}/`, '');
}

export function getLocale(resolvedModuleId: string): Locale | undefined {
  if (!resolvedModuleIds.has(resolvedModuleId)) {
    return undefined;
  }

  const moduleId = resolvedModuleId.replace(/^\0/, '');

  return _getLocale(moduleId);
}

export function getResolvedModuleIds(): string[] {
  return Array.from(resolvedModuleIds);
}

export function isTranslationFile(filePath: string, options: Options): boolean {
  const { ext } = parseFilePath(filePath);

  if (!supportedExtensions.has(ext)) {
    return false;
  }

  const { config, projectRoot } = options;
  const { addonPaths, buildOptions } = config;

  const foldersToWatch: string[] = [
    /*
      TODO: Vite/chokidar can't watch changes to `node_modules`.
      See https://github.com/vitejs/vite/issues/8619.
    */
    ...addonPaths.map((addonPath) => {
      return join(projectRoot, addonPath, 'translations');
    }),
    join(projectRoot, buildOptions.inputPath),
  ];

  return foldersToWatch.some((folder) => filePath.startsWith(folder));
}

export function resolveModuleId(moduleId: string): string | undefined {
  if (!moduleId.startsWith(`${VIRTUAL_MODULE_ID}/`)) {
    return undefined;
  }

  if (_getLocale(moduleId) === '') {
    return undefined;
  }

  const resolvedModuleId = `\0${moduleId}`;
  resolvedModuleIds.add(resolvedModuleId);

  return resolvedModuleId;
}
