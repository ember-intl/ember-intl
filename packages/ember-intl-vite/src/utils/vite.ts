import type { Locale } from '../types/index.js';

const VIRTUAL_MODULE_ID = 'virtual:ember-intl/translations' as const;
const resolvedModuleIds = new Set<string>();

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
