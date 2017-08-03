import config from '../config/environment';
import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  intl: service(),
  activeLocale: computed.readOnly('intl.locale'),

  locales: computed(function() {
    return get(this, 'intl')
      ._lookupByFactoryType('translations', config.modulePrefix)
      .map(moduleName => moduleName.split('/').pop());
  }).readOnly(),

  selections: computed('locales.[]', 'activeLocale', function() {
    let active = get(this, 'activeLocale');

    return get(this, 'locales').map(locale => {
      return {
        locale: locale,
        active: active.indexOf(locale) > -1
      };
    });
  }).readOnly(),

  actions: {
    changeLocale(locale) {
      return get(this, 'intl').setLocale(locale);
    }
  }
});
