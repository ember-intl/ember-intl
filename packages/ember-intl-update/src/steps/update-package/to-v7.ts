import type { Options } from '../../types/index.js';
import { updateDependencies } from './to-v7/update-dependencies.js';

export function updatePackageToV7(options: Options): void {
  updateDependencies(options);
}
