import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

import type IntlService from '../services/intl';

export default class FormatMessageHelper extends Helper {
  @service declare intl: IntlService;

  allowEmpty = false;

  declare unsubscribeLocaleChanged: () => void;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.unsubscribeLocaleChanged = this.intl.onLocaleChanged(
      this.recompute,
      this,
    );
  }

  format(value, options) {
    return this.intl.formatMessage(value, options);
  }

  compute([value, positionalOptions], namedOptions) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    if (isEmpty(value)) {
      if (options.allowEmpty ?? this.allowEmpty) {
        return;
      }

      if (typeof value === 'undefined') {
        throw new Error(`${this} helper requires value attribute.`);
      }
    }

    return this.format(value, options);
  }

  willDestroy() {
    super.willDestroy();

    this.unsubscribeLocaleChanged();
  }
}
