import { AST } from '@codemod-utils/ast-template';

import type { Dependencies } from './find-dependencies.js';

type Expression = ReturnType<typeof AST.builders.path>;

type Data = {
  dependencies: NonNullable<Dependencies>;
  isTemplateTag: boolean;
};

function saveKeys(keys: string[], node: Expression | undefined): void {
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

export function inTemplate(file: string, data: Data): string[] {
  const { dependencies, isTemplateTag } = data;

  const canSkip =
    isTemplateTag &&
    dependencies.helpers.t === undefined &&
    dependencies.helpers.tKey === undefined &&
    dependencies.services.intl === undefined;

  if (canSkip) {
    return [];
  }

  const traverse = AST.traverse();
  const keys: string[] = [];

  traverse(file, {
    MustacheStatement(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      switch (node.path.original) {
        case dependencies.helpers.t:
        case dependencies.helpers.tKey:
        case `this.${dependencies.services.intl}.t`: {
          saveKeys(keys, node.params[0]);
          break;
        }
      }
    },

    SubExpression(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      switch (node.path.original) {
        case dependencies.helpers.t:
        case dependencies.helpers.tKey:
        case `this.${dependencies.services.intl}.t`: {
          saveKeys(keys, node.params[0]);
          break;
        }
      }
    },
  });

  return keys;
}
