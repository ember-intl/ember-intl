import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatTime']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatTimeSignature {
  Args: {
    Named?: Options;
    Positional: [Value] | [Value, Options];
  };
  Return: string;
}

export default class FormatTimeHelper extends Helper<FormatTimeSignature> {
  @service declare intl: IntlService;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.intl.onLocaleChanged(this.recompute, this);
  }

  compute(
    [value, positionalOptions]: FormatTimeSignature['Args']['Positional'],
    namedOptions: FormatTimeSignature['Args']['Named'],
  ) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    return this.intl.formatTime(value, options);
  }
}
