import { parseFilePath } from '@codemod-utils/files';

import { findIcuArguments } from '../../src/utils/icu-message/find-icu-arguments.js';

type Data = {
  message: string;
  translationFilePaths: string[];
};

export function stubMapping(data: Data) {
  const { message, translationFilePaths } = data;

  return new Map(
    translationFilePaths.map((filePath) => {
      const { name: locale } = parseFilePath(filePath);

      return [
        locale,
        {
          filePath,
          icuArguments: findIcuArguments(message),
          message,
        },
      ];
    }),
  );
}
