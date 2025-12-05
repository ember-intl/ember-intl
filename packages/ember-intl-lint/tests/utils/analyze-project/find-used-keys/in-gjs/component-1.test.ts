import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gjs > component (1)', function () {
  const file = normalizeFile([`<template></template>`, ``]);

  const keys = inGjsGts(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, []);
});
