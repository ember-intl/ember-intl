import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatRelative']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatRelativeSignature {
  Args: {
    Named?: Options & { allowEmpty?: boolean };
    Positional: [Value] | [Value, Options];
  };
  Return: string;
}

export default class FormatRelativeHelper extends Helper<FormatRelativeSignature> {
  @service declare intl: IntlService;

  allowEmpty = false;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.intl.onLocaleChanged(this.recompute, this);
  }

  compute(
    [value, positionalOptions]: FormatRelativeSignature['Args']['Positional'],
    namedOptions: FormatRelativeSignature['Args']['Named'],
  ) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    if (isEmpty(value)) {
      if (options?.allowEmpty ?? this.allowEmpty) {
        return '';
      }

      if (typeof value === 'undefined') {
        throw new Error('{{format-relative}} helper requires a value.');
      }
    }

    return this.intl.formatRelative(value!, options);
  }
}
