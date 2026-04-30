import { AST } from '@codemod-utils/ast-javascript';

import type { TranslationKey } from '../../../../types/index.js';
import type { Dependencies } from './find-dependencies.js';

type ExpressionStatement = typeof AST.builders.expressionStatement;
type ExpressionKind = Parameters<ExpressionStatement>[0];

type Data = {
  dependencies: NonNullable<Dependencies>;
  isTypeScript: boolean;
};

function saveKeys(keys: TranslationKey[], path: ExpressionKind): void {
  switch (path.type) {
    case 'ConditionalExpression': {
      saveKeys(keys, path.consequent);
      saveKeys(keys, path.alternate);
      break;
    }

    case 'Literal':
    case 'StringLiteral': {
      keys.push(path.value as TranslationKey);
      break;
    }

    case 'TemplateLiteral': {
      if (path.quasis[0]?.tail === true) {
        keys.push(path.quasis[0].value.raw);
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
    visitCallExpression(path) {
      this.traverse(path);

      if (path.node.arguments.length === 0) {
        return false;
      }

      switch (path.node.callee.type) {
        case 'Identifier': {
          const { name } = path.node.callee;

          if (
            name !== dependencies.helpers.t &&
            name !== dependencies.helpers.tKey
          ) {
            return false;
          }

          saveKeys(keys, path.node.arguments[0] as ExpressionKind);

          break;
        }

        case 'MemberExpression': {
          const { object, property } = path.node.callee;

          const isIntlService =
            (object.type === 'Identifier' &&
              object.name === dependencies.services.intl) ||
            // @ts-expect-error: Incorrect type
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (object.property?.type === 'Identifier' &&
              // @ts-expect-error: Incorrect type
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              object.property.name === dependencies.services.intl);

          if (!isIntlService) {
            return false;
          }

          if (property.type !== 'Identifier' || property.name !== 't') {
            return false;
          }

          saveKeys(keys, path.node.arguments[0] as ExpressionKind);

          break;
        }
      }

      return false;
    },
  });

  return keys;
}
