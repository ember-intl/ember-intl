export function stubMapping(message: string, filePaths: string[]) {
  return new Map(
    filePaths.map((filePath) => {
      return [
        filePath,
        {
          message,
        },
      ];
    }),
  );
}
