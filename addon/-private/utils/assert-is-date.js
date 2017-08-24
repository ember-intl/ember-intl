import { assert } from '@ember/debug';

export default function assertIsDate(date, errMsg) {
  assert(errMsg, isFinite(date));
}
