import { findIcuArguments } from '../../src/utils/icu-message/find-icu-arguments.js';

export function stubMapping(message: string, filePaths: string[]) {
  return new Map(
    filePaths.map((filePath) => {
      return [
        filePath,
        {
          icuArguments: findIcuArguments(message),
          message,
        },
      ];
    }),
  );
}
