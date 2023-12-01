import Helper from '@ember/component/helper';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';
import type { SafeString } from '@ember/template/-private/handlebars';
import { isEmpty } from '@ember/utils';

import type IntlService from '../services/intl';

type Params = Parameters<IntlService['formatMessage']>;
type Value = Params[0];
type Options = Params[1];

interface FormatMessageSignature {
  Args: {
    Named?: Options & { allowEmpty?: boolean };
    Positional: [Value?, Options?];
  };
  Return: string | SafeString | undefined;
}

export default class FormatMessageHelper extends Helper<FormatMessageSignature> {
  @service declare intl: IntlService;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    registerDestructor(this, () => {
      // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
      this.intl.onLocaleChanged(this.recompute, this);
    });
  }

  compute(
    [value, positionalOptions]: FormatMessageSignature['Args']['Positional'],
    namedOptions: FormatMessageSignature['Args']['Named'],
  ) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    if (isEmpty(value)) {
      if (options?.allowEmpty) {
        return;
      }

      if (typeof value === 'undefined') {
        throw new Error('{{format-message}} helper requires a value.');
      }
    }

    return this.intl.formatMessage(value!, options);
  }
}