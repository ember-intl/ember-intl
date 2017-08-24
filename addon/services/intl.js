/* globals requirejs, Intl */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import RSVP from 'rsvp';
import Service from '@ember/service';
import { makeArray } from '@ember/array';
import { assign } from '@ember/polyfills';
import Evented from '@ember/object/evented';
import { assert, warn } from '@ember/debug';
import { getOwner } from '@ember/application';
import { set, get, computed } from '@ember/object';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import { links, isArrayEqual, EmptyObject, normalizeLocale } from '../-private/utils';
import { FormatDateTime, FormatNumber, FormatMessage, FormatRelative } from '../-private/formatters';

function formatterProxy(ctr) {
  return function(value, opts, formats) {
    let formatOpts = opts;

    if (opts && typeof opts.format === 'string') {
      formatOpts = assign({}, this.lookupFormat(ctr.formatType, formatOpts.format), formatOpts);
    }

    if (!this._formatters[ctr.formatType]) {
      this._formatters[ctr.formatType] = ctr.create();
    }

    let formatter = this._formatters[ctr.formatType];

    return formatter.format(value, formatOpts, {
      formats: formats || get(this, 'formats'),
      locale: this._localeWithDefault(formatOpts && formatOpts.locale)
    });
  };
}

const IntlService = Service.extend(Evented, {
  _locale: null,

  /** @public **/
  locale: computed('_locale', {
    set() {
      throw new Error('Use `setLocale` to change the application locale');
    },
    get() {
      return get(this, '_locale');
    }
  }),

  /** @private **/
  adapter: computed({
    get() {
      return this._owner.lookup('ember-intl@adapter:default');
    }
  }).readOnly(),

  /** @public **/
  formats: computed({
    get() {
      return this._owner.resolveRegistration('formats:main') || new EmptyObject();
    }
  }).readOnly(),

  /** @public **/
  formatRelative: formatterProxy(FormatRelative),

  /** @public **/
  formatMessage: formatterProxy(FormatMessage),

  /** @public **/
  formatNumber: formatterProxy(FormatNumber),

  /** @public **/
  formatDateTime: formatterProxy(FormatDateTime),

  /** @private **/
  requirejs: requirejs,

  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  locales: computed.readOnly('adapter.locales'),

  /** @public **/
  init() {
    this._super(...arguments);

    if (typeof Intl === 'undefined') {
      warn(`[ember-intl] Intl API is unavailable in this environment.\nSee: ${links.polyfill}`, false, {
        id: 'ember-intl-undefined-intljs'
      });
    }

    this._owner = getOwner(this);
    this._formatters = new EmptyObject();
    this._hydrate();
  },

  /**
   * Peeks into the requirejs map and registers all locale data objects found.
   *
   * @private
   */
  _hydrate() {
    const config = this._owner.resolveRegistration('config:environment');
    const cldrs = this._lookupByFactoryType('cldrs', config.modulePrefix);
    const translations = this._lookupByFactoryType('translations', config.modulePrefix);

    if (!cldrs.length) {
      warn(
        `[ember-intl] project is missing CLDR data\nIf you are asynchronously loading translation, see: ${links.asyncTranslations}.`,
        false,
        {
          id: 'ember-intl-missing-cldr-data'
        }
      );
    }

    cldrs
      .map(moduleName => {
        return this._owner.resolveRegistration(`cldr:${moduleName.split('/').pop()}`);
      })
      .forEach(data => data.forEach(this.addLocaleData));

    translations.forEach(moduleName => {
      const localeName = moduleName.split('/').pop();

      this.addTranslations(localeName, this._owner.resolveRegistration(`translation:${localeName}`));
    });
  },

  /** @private **/
  _lookupByFactoryType(type, modulePrefix) {
    return Object.keys(this.requirejs.entries).filter(key => {
      return key.indexOf(`${modulePrefix}/${type}/`) === 0;
    });
  },

  /** @private **/
  _localeWithDefault(localeName) {
    if (!localeName) {
      return get(this, '_locale') || [];
    }

    if (typeof localeName === 'string') {
      return makeArray(localeName).map(normalizeLocale);
    }

    if (Array.isArray(localeName)) {
      return localeName.map(normalizeLocale);
    }
  },

  /** @public **/
  lookup(key, localeName, opts) {
    const localeNames = this._localeWithDefault(localeName);
    const translation = get(this, 'adapter').lookup(localeNames, key);

    if (opts && !opts.resilient && translation === undefined) {
      const missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames);
    }

    return translation;
  },

  /** @public **/
  t(key, ...args) {
    const [opts] = args;
    const translation = this.lookup(key, opts && opts.locale, {
      resilient: opts && typeof opts.fallback === 'string'
    });

    const value = typeof translation === 'string' ? translation : opts.fallback;

    return this.formatMessage(value, ...args);
  },

  /** @public **/
  exists(key, localeName) {
    const localeNames = this._localeWithDefault(localeName);
    const adapter = get(this, 'adapter');

    assert(`[ember-intl] locale is unset, cannot lookup '${key}'`, Array.isArray(localeNames) && localeNames.length);

    return localeNames.some(localeName => {
      return adapter.has(localeName, key);
    });
  },

  /**
  * A utility method for registering CLDR data for
  * intl-messageformat and intl-relativeformat.  This data is derived
  * from formatjs-extract-cldr-data
  *
  * @method addLocaleData
  * @param {Object} locale data
  * @public
  */
  addLocaleData(data) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
  },

  /** @public **/
  addTranslation(localeName, key, value) {
    return this.localeFactory(localeName).then(locale => {
      return locale.addTranslation(key, value);
    });
  },

  /** @public **/
  addTranslations(localeName, payload) {
    return this.localeFactory(localeName).then(locale => {
      return locale.addTranslations(payload);
    });
  },

  /** @public **/
  setLocale(localeName) {
    const proposed = makeArray(localeName).map(normalizeLocale);
    const current = get(this, '_locale');

    if (!isArrayEqual(proposed, current)) {
      this.propertyWillChange('locale');
      set(this, '_locale', proposed);
      this.propertyDidChange('locale');
      this.trigger('localeChanged');
    }
  },

  /** @private **/
  lookupFormat(formatType, name) {
    if (typeof formatType !== 'string' || typeof name !== 'string') {
      return;
    }

    return get(this, `formats.${formatType}.${name}`);
  },

  /** @public **/
  localeFactory(localeName) {
    return RSVP.cast(get(this, 'adapter').localeFactory(normalizeLocale(localeName), true));
  },

  /** @public **/
  findTranslationByKey(key, localeName, opts) {
    return this.lookup(key, localeName, opts);
  },

  /** @public **/
  translationsFor(localeName) {
    return this.localeFactory(localeName);
  }
});

export default IntlService;
