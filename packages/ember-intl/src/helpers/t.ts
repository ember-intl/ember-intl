import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl.ts';

type TParameters = Parameters<IntlService['t']>;
type Key = TParameters[0];
type Options = TParameters[1];

interface TSignature {
  Args: {
    Named?: Options;
    Positional: [Key] | [Key, Options];
  };
  Return: string;
}

export default class THelper extends Helper<TSignature> {
  @service declare intl: IntlService;

  compute(
    [key, positionalOptions]: TSignature['Args']['Positional'],
    namedOptions: TSignature['Args']['Named'],
  ) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    return this.intl.t(key, options);
  }
}
