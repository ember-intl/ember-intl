import Helper from '@ember/component/helper';

import IntlService from '../services/intl';

// eslint-disable-next-line @typescript-eslint/ban-types
export default abstract class AbstractHelper<V, O extends {} | undefined> extends Helper {
  readonly intl: IntlService;
  allowEmpty: boolean;

  abstract format(value: V, namedOptions?: O): string;

  compute(positional: [undefined], namedOptions: O & { allowEmpty: false }): never;
  compute(positional: [undefined], namedOptions: O & { allowEmpty: true }): void;
  compute(positional: [value: V, positionalOptions?: O], namedOptions: O & { allowEmpty?: boolean }): string | never;
}
