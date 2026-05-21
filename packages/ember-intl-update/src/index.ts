import { createOptions, updatePackage } from './steps/index.js';
import type { CodemodOptions, Todos } from './types/index.js';

export async function runCodemod(
  codemodOptions: CodemodOptions,
): Promise<Todos> {
  const options = createOptions(codemodOptions);
  const todos = await updatePackage(options);

  return todos.sort();
}
