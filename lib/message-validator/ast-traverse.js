const { TYPE } = require('intl-messageformat-parser');

function traverse(node, visitor) {
  if (Array.isArray(node)) {
    node.forEach((n) => {
      traverse(n, visitor);
    });
  }

  if (!node || typeof node.type === 'undefined') {
    return;
  }

  if (visitor[node.type]) {
    visitor[node.type](node);
  }

  switch (node.type) {
    case TYPE.select:
    case TYPE.plural: {
      Object.values(node.options).forEach((it) => {
        traverse(it.value, visitor);
      });
      break;
    }
  }
}

module.exports = traverse;
