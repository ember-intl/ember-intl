import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default class FormatDateHelper extends Helper {
  allowEmpty = true;
  intl = null;
  declare unsubscribeLocaleChanged: () => void;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    this.intl = getOwner(this).lookup('service:intl');

    this.unsubscribeLocaleChanged = this.intl.onLocaleChanged(
      this.recompute,
      this,
    );
  }

  format(value, options) {
    return this.intl.formatDate(value, options);
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
