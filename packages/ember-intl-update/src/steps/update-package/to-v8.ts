import type { Options } from '../../types/index.js';
import { updateDependencies } from './to-v8/update-dependencies.js';

export function updatePackageToV8(options: Options): void {
  updateDependencies(options);
}
