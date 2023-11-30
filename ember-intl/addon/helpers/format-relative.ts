import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default class FormatRelativeHelper extends Helper {
  allowEmpty = false;
  intl = null;
  unsubscribeLocaleChanged = null;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    this.intl = getOwner(this).lookup('service:intl');

    this.unsubscribeLocaleChanged = this.intl.onLocaleChanged(
      this.recompute,
      this,
    );
  }

  format(params, hash) {
    return this.intl.formatRelative(params, hash);
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
