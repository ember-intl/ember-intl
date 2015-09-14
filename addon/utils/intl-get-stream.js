// TODO: remove me once we drop support for < 1.13

import { Stream } from '../utils/streams';

export function IntlGetStream() {
  Stream.apply(this, arguments);
}

IntlGetStream.prototype = Object.create(Stream.prototype);
IntlGetStream.prototype.constructor = IntlGetStream;
