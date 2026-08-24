import { AST } from '@codemod-utils/ast-javascript';

type ObjectExpression = ReturnType<typeof AST.builders.objectExpression>;
type ObjectProperty = ReturnType<typeof AST.builders.objectProperty>;

function flattenObjectExpression(
  obj: ObjectExpression,
  parentKey?: string,
): ObjectExpression {
  obj.properties = obj.properties.reduce((accumulator, property) => {
    if (
      property.type !== 'ObjectProperty' ||
      (property.key.type !== 'Identifier' &&
        property.key.type !== 'StringLiteral')
    ) {
      return accumulator;
    }

    const childKey =
      property.key.type === 'Identifier'
        ? property.key.name
        : property.key.value;

    const key = parentKey === undefined ? childKey : `${parentKey}.${childKey}`;

    switch (property.value.type) {
      case 'StringLiteral': {
        if (property.key.type === 'Identifier') {
          property.key.name = `'${key}'`;
        } else {
          property.key.value = key;
        }

        accumulator.push(property);

        break;
      }

      case 'ObjectExpression': {
        const obj = flattenObjectExpression(
          property.value,
          key.replaceAll(' ', '_'),
        );

        accumulator.push(...(obj.properties as ObjectProperty[]));

        break;
      }
    }

    return accumulator;
  }, [] as ObjectProperty[]);

  return obj;
}

export function updateSetupIntl(file: string): {
  file: string;
  update: boolean;
} {
  let update = false;

  const ast = AST.traverse(file, {
    visitCallExpression(path) {
      this.traverse(path);

      if (
        path.node.callee.type !== 'Identifier' ||
        path.node.callee.name !== 'setupIntl' ||
        path.node.arguments.length !== 3
      ) {
        return false;
      }

      const argumentForTranslations = path.node.arguments.at(2);

      if (
        argumentForTranslations === undefined ||
        argumentForTranslations.type !== 'ObjectExpression'
      ) {
        return false;
      }

      path.node.arguments.splice(
        2,
        1,
        flattenObjectExpression(argumentForTranslations),
      );

      update = true;

      return false;
    },
  });

  return {
    file: AST.print(ast),
    update,
  };
}
