import { join } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type { Locale, Options } from '../types/index.js';

const supportedExtensions = new Set(['.json', '.yaml', '.yml']);

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

export class ModuleTracker {
  private resolvedModuleIds = new Set<string>();

  private static VIRTUAL_MODULE_ID = 'virtual:ember-intl/translations';

  private _getLocale(moduleId: string): Locale {
    return moduleId.replace(`${ModuleTracker.VIRTUAL_MODULE_ID}/`, '');
  }

  getLocale(resolvedModuleId: string): Locale | undefined {
    if (!this.resolvedModuleIds.has(resolvedModuleId)) {
      return undefined;
    }

    const moduleId = resolvedModuleId.replace(/^\0/, '');

    return this._getLocale(moduleId);
  }

  getResolvedModuleIds(): string[] {
    return Array.from(this.resolvedModuleIds);
  }

  resolveModuleId(moduleId: string): string | undefined {
    if (!moduleId.startsWith(`${ModuleTracker.VIRTUAL_MODULE_ID}/`)) {
      return undefined;
    }

    if (this._getLocale(moduleId) === '') {
      return undefined;
    }

    const resolvedModuleId = `\0${moduleId}`;
    this.resolvedModuleIds.add(resolvedModuleId);

    return resolvedModuleId;
  }
}
