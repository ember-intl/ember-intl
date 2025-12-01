import { assert, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gts > component (1)', function () {
  const file = [
    `import type { TOC } from '@ember/component/template-only';`,
    ``,
    `interface HelloSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `<template></template> satisfies TOC<HelloSignature>;`,
    ``,
  ].join('\n');

  const keys = inGjsGts(file, {
    isTypeScript: true,
  });

  assert.deepStrictEqual(keys, []);
});
