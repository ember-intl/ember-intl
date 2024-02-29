import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

import type IntlService from '../services/intl';

type Params = Parameters<IntlService['formatDate']>;
type Value = string | number | Date | null | undefined;
type Options = Params[1];

interface FormatDateSignature {
  Args: {
    Named?: Options & { allowEmpty?: boolean };
    Positional: [Value] | [Value, Options];
  };
  Return: string;
}

export default class FormatDateHelper extends Helper<FormatDateSignature> {
  @service declare intl: IntlService;

  allowEmpty = true;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.intl.onLocaleChanged(this.recompute, this);
  }

  compute(
    [value, positionalOptions]: FormatDateSignature['Args']['Positional'],
    namedOptions: FormatDateSignature['Args']['Named'],
  ) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    if (isEmpty(value)) {
      if (options?.allowEmpty ?? this.allowEmpty) {
        return '';
      }

      /*
        TODO: {{format-date}} is the only helper that always allows
        an undefined value. That is, it can never throw an error.
        For ember-intl@v7, unify the options of all helpers.
      */
      // if (typeof value === 'undefined') {
      //   throw new Error('{{format-date}} helper requires a value.');
      // }
    }

    return this.intl.formatDate(value!, options);
  }
}
