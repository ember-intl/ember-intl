import type {
  ArgumentElement,
  DateElement,
  LiteralElement,
  MessageFormatElement,
  NumberElement,
  PluralElement,
  SelectElement,
  TimeElement,
} from '@formatjs/icu-messageformat-parser';
import { parse, TYPE } from '@formatjs/icu-messageformat-parser';

type VisitMethods = {
  Argument?: (node: ArgumentElement) => void;
  Date?: (node: DateElement) => void;
  Literal?: (node: LiteralElement) => void;
  Number?: (node: NumberElement) => void;
  Plural?: (node: PluralElement) => void;
  Select?: (node: SelectElement) => void;
  Time?: (node: TimeElement) => void;
};

function _traverse(
  ast: MessageFormatElement | MessageFormatElement[],
  visitMethods: VisitMethods,
): void {
  if (Array.isArray(ast)) {
    ast.forEach((node) => {
      _traverse(node, visitMethods);
    });

    return;
  }

  switch (ast.type) {
    case TYPE.argument: {
      visitMethods['Argument']?.(ast);

      break;
    }

    case TYPE.date: {
      visitMethods['Date']?.(ast);

      break;
    }

    case TYPE.literal: {
      visitMethods['Literal']?.(ast);

      break;
    }

    case TYPE.number: {
      visitMethods['Number']?.(ast);

      break;
    }

    case TYPE.plural: {
      visitMethods['Plural']?.(ast);

      Object.values(ast.options).forEach(({ value }) => {
        _traverse(value, visitMethods);
      });

      break;
    }

    case TYPE.select: {
      visitMethods['Select']?.(ast);

      Object.values(ast.options).forEach(({ value }) => {
        _traverse(value, visitMethods);
      });

      break;
    }

    case TYPE.time: {
      visitMethods['Time']?.(ast);

      break;
    }
  }
}

function traverse() {
  return function (message: string, visitMethods: VisitMethods = {}): void {
    // Keep the options for `parse()` in sync with those for `formatMessage()`
    const ast = parse(message, {
      ignoreTag: true,
      requiresOtherClause: true,
    });

    _traverse(ast, visitMethods);
  };
}

export const AST = {
  builders: undefined,
  print: undefined,
  traverse,
};
