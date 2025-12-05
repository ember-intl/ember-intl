import { sep } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { unnormalizedJoin } from '../../../../src/utils/files/index.js';

const onPosix = sep === '/';

test('utils | files | unnormalized-join > POSIX', function () {
  if (!onPosix) {
    return;
  }

  const pattern = unnormalizedJoin('app/components', 'ui', '**/*.ts');

  assert.strictEqual(pattern, 'app/components/ui/**/*.ts');
});
