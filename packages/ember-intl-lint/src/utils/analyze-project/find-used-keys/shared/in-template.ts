import { AST } from '@codemod-utils/ast-template';

import type { TranslationKey } from '../../../../types/index.js';
import type { Dependencies } from './find-dependencies.js';

type Expression = ReturnType<typeof AST.builders.path>;

type Data = {
  dependencies: NonNullable<Dependencies>;
  isTemplateTag: boolean;
};

function saveKeys(keys: TranslationKey[], node: Expression | undefined): void {
  if (node === undefined) {
    return;
  }

  switch (node.type) {
    case 'StringLiteral': {
      keys.push(node.original);
      break;
    }

    case 'SubExpression': {
      if (node.path.type === 'PathExpression') {
        switch (node.path.original) {
          case 'if':
          case 'unless': {
            saveKeys(keys, node.params[1]);
            saveKeys(keys, node.params[2]);
            break;
          }
        }
      }
    }
  }
}

function isTranslation(name: string, dependencies: Dependencies): boolean {
  return (
    dependencies.helpers.has(name) ||
    (dependencies.services.intl !== undefined &&
      name === `this.${dependencies.services.intl}.t`)
  );
}

export function inTemplate(file: string, data: Data): TranslationKey[] {
  const { dependencies, isTemplateTag } = data;

  const canSkip =
    isTemplateTag &&
    dependencies.helpers.size === 0 &&
    dependencies.services.intl === undefined;

  if (canSkip) {
    return [];
  }

  const keys: TranslationKey[] = [];

  AST.traverse(file, {
    MustacheStatement(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      if (isTranslation(node.path.original, dependencies)) {
        saveKeys(keys, node.params[0]);
      }
    },

    SubExpression(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      if (isTranslation(node.path.original, dependencies)) {
        saveKeys(keys, node.params[0]);
      }
    },
  });

  return keys;
}
