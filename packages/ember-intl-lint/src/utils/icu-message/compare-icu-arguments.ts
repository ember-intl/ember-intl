import type { IcuArguments, IcuArgumentType } from '../../types/index.js';

export function compareIcuArguments(a: IcuArguments, b: IcuArguments): boolean {
  let match = true;

  for (const [type, aValue] of Object.entries(a) as [
    IcuArgumentType,
    Set<string>,
  ][]) {
    const bValue = b[type];

    if (aValue.size !== bValue.size) {
      match = false;
      break;
    }

    aValue.forEach((argumentName) => {
      if (!bValue.has(argumentName)) {
        match = false;
      }
    });

    if (!match) {
      break;
    }
  }

  return match;
}
