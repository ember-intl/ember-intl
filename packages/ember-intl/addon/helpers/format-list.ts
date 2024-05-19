import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatList']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatListSignature {
  Args: {
    Named?: Options;
    Positional: [Value] | [Value, Options];
  };
  Return: string;
}

export default class FormatListHelper extends Helper<FormatListSignature> {
  @service declare intl: IntlService;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.intl.onLocaleChanged(this.recompute, this);
  }

  compute(
    [value, positionalOptions]: FormatListSignature['Args']['Positional'],
    namedOptions: FormatListSignature['Args']['Named'],
  ) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    return this.intl.formatList(value, options);
  }
}
