import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatMessage']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatMessageSignature {
  Args: {
    Named?: Options;
    Positional: [Value] | [Value, Options];
  };
  Return: string;
}

export default class FormatMessageHelper extends Helper<FormatMessageSignature> {
  @service declare intl: IntlService;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.intl.onLocaleChanged(this.recompute, this);
  }

  compute(
    [value, positionalOptions]: FormatMessageSignature['Args']['Positional'],
    namedOptions: FormatMessageSignature['Args']['Named'],
  ) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    return this.intl.formatMessage(value, options as Options);
  }
}
