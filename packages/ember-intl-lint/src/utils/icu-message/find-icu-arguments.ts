import type { IcuArguments } from '../../types/index.js';
import { AST } from './ast.js';

export function findIcuArguments(message: string): IcuArguments {
  const icuArguments: IcuArguments = {
    argument: new Set(),
    date: new Set(),
    number: new Set(),
    plural: new Set(),
    select: new Set(),
    time: new Set(),
  };

  const traverse = AST.traverse();

  try {
    traverse(message, {
      Argument(node) {
        icuArguments.argument.add(node.value);
      },

      Date(node) {
        icuArguments.date.add(node.value);
      },

      Number(node) {
        icuArguments.number.add(node.value);
      },

      Plural(node) {
        icuArguments.plural.add(node.value);
      },

      Select(node) {
        icuArguments.select.add(node.value);
      },

      Time(node) {
        icuArguments.time.add(node.value);
      },
    });

    return icuArguments;
  } catch (error) {
    throw new Error(
      `Unable to parse \`${message}\` (${(error as Error).message})`,
    );
  }
}
