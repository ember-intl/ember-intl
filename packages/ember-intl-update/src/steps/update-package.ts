import type { Options } from '../types/index.js';
import { updatePackageToV7 } from './update-package/to-v7.js';
import { updatePackageToV8 } from './update-package/to-v8.js';

export function updatePackage(options: Options): void {
  switch (options.targetVersion) {
    case 7: {
      updatePackageToV7(options);
      break;
    }

    case 8: {
      updatePackageToV8(options);
      break;
    }
  }
}
