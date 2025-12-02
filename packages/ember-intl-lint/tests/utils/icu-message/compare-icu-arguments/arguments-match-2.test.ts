import { assert, test } from '@codemod-utils/tests';

import type { IcuArguments } from '../../../../src/types/index.js';
import { compareIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | compare-icu-arguments > arguments match (2)', function () {
  const a: IcuArguments = {
    argument: new Set(['c', 'a', 'b']),
    date: new Set(['d']),
    number: new Set(['e', 'f', 'g']),
    plural: new Set(['h', 'j', 'g', 'i']),
    select: new Set(['l', 'k']),
    time: new Set(['m', 'n', 'o', 'p']),
  };

  const b: IcuArguments = {
    argument: new Set(['b', 'c', 'a']),
    date: new Set(['d']),
    number: new Set(['e', 'g', 'f']),
    plural: new Set(['g', 'h', 'i', 'j']),
    select: new Set(['k', 'l']),
    time: new Set(['m', 'n', 'o', 'p']),
  };

  assert.strictEqual(compareIcuArguments(a, b), true);
});
