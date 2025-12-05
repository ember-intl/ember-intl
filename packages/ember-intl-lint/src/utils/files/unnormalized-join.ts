import { join, sep } from 'node:path';

export function unnormalizedJoin(...folders: string[]): string {
  return join(...folders).replaceAll(sep, '/');
}
