import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

import type IntlService from '../services/intl';

type Params = Parameters<IntlService['formatList']>;
type Value = string[] | null | undefined;
type Options = Params[1];

interface FormatListSignature {
  Args: {
    Named?: Options & { allowEmpty?: boolean };
    Positional: [Value] | [Value, Options];
  };
  Return: string;
}

export default class FormatListHelper extends Helper<FormatListSignature> {
  @service declare intl: IntlService;

  allowEmpty = false;

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

    if (isEmpty(value)) {
      if (options?.allowEmpty ?? this.allowEmpty) {
        return '';
      }

      if (typeof value === 'undefined') {
        throw new Error('{{format-list}} helper requires a value.');
      }
    }

    return this.intl.formatList(value!, options);
  }
}
