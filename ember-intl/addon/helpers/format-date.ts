import Helper from '@ember/component/helper';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

import type IntlService from '../services/intl';

export default class FormatDateHelper extends Helper {
  @service declare intl: IntlService;

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    registerDestructor(this, () => {
      // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
      this.intl.onLocaleChanged(this.recompute, this);
    });
  }

  compute([value, positionalOptions], namedOptions) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    if (isEmpty(value)) {
      if (options.allowEmpty ?? true) {
        return;
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

    return this.intl.formatDate(value, options);
  }
}
