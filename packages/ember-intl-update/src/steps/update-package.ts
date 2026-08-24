import type { Options, Todos } from '../types/index.js';
import { updatePackageToV7 } from './update-package/to-v7.js';
import { updatePackageToV8 } from './update-package/to-v8.js';
import { updatePackageToV9 } from './update-package/to-v9.js';

export async function updatePackage(options: Options): Promise<Todos> {
  switch (options.targetVersion) {
    case 7: {
      return updatePackageToV7(options);
    }

    case 8: {
      return await updatePackageToV8(options);
    }

    case 9: {
      return updatePackageToV9(options);
    }
  }
}
