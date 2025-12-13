import { createBuilder } from 'broccoli-test-helper';

export async function buildTranslationsDir(outputNode: unknown) {
  const builder = createBuilder(outputNode);
  await builder.build();

  return builder.read();
}
