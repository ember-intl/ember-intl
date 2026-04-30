import { AST } from '@codemod-utils/ast-javascript';

import type { TranslationKey } from '../../../../types/index.js';
import type { Dependencies } from './find-dependencies.js';

type ExpressionStatement = ReturnType<typeof AST.builders.expressionStatement>;
type Expression = ExpressionStatement['expression'];

type Data = {
  dependencies: NonNullable<Dependencies>;
  isTypeScript: boolean;
};

function saveKeys(keys: TranslationKey[], node: Expression): void {
  switch (node.type) {
    case 'ConditionalExpression': {
      saveKeys(keys, node.consequent);
      saveKeys(keys, node.alternate);
      break;
    }

    case 'Literal':
    case 'StringLiteral': {
      keys.push(node.value as TranslationKey);
      break;
    }

    case 'TemplateLiteral': {
      if (node.quasis[0]?.tail === true) {
        keys.push(node.quasis[0].value.raw);
      }
      break;
    }
  }
}

export function inJavascript(file: string, data: Data): TranslationKey[] {
  const { dependencies, isTypeScript } = data;

  const canSkip =
    dependencies.helpers.t === undefined &&
    dependencies.helpers.tKey === undefined &&
    dependencies.services.intl === undefined;

  if (canSkip) {
    return [];
  }

  const traverse = AST.traverse(isTypeScript);
  const keys: TranslationKey[] = [];

  traverse(file, {
    visitCallExpression(node) {
      this.traverse(node);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (node.value.arguments.length === 0) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (node.value.callee.type) {
        case 'Identifier': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const { name } = node.value.callee;

          if (
            name !== dependencies.helpers.t &&
            name !== dependencies.helpers.tKey
          ) {
            return false;
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          saveKeys(keys, node.value.arguments[0]);

          break;
        }

        case 'MemberExpression': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const { object, property } = node.value.callee;

          const isIntlService =
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (object.type === 'Identifier' &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              object.name === dependencies.services.intl) ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (object.property?.type === 'Identifier' &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              object.property.name === dependencies.services.intl);

          if (!isIntlService) {
            return false;
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (property.type !== 'Identifier' || property.name !== 't') {
            return false;
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          saveKeys(keys, node.value.arguments[0]);

          break;
        }
      }

      return false;
    },
  });

  return keys;
}
