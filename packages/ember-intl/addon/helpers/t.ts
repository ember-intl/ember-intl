import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import type IntlService from '../services/intl';

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

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.intl.onLocaleChanged(this.recompute, this);
  }

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
