/* globals requirejs, Intl */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Service from '@ember/service';
import { makeArray } from '@ember/array';
import { assign } from '@ember/polyfills';
import Evented from '@ember/object/evented';
import { assert, warn } from '@ember/debug';
import { getOwner } from '@ember/application';
import { set, get, computed } from '@ember/object';
import { deprecate } from '@ember/application/deprecations';

import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';

import {
  FormatDate,
  FormatTime,
  FormatMessage,
  FormatNumber,
  FormatRelative,
  FormatHtmlMessage
} from '../-private/formatters';

import links from '../utils/links';
import isArrayEqual from '../-private/is-array-equal';
import normalizeLocale from '../-private/normalize-locale';

function formatter(name) {
  return function(value, options, formats) {
    let formatOptions = options;

    if (options && typeof options.format === 'string') {
      formatOptions = assign({}, this.getFormat(name, formatOptions.format), formatOptions);
    }

    return this._formatters[name].format(value, formatOptions, {
      formats: formats || get(this, 'formats'),
      locale: this._localeWithDefault(formatOptions && formatOptions.locale)
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
  }),

  /** @public **/
  formats: computed({
    get() {
      return this._owner.resolveRegistration('formats:main') || {};
    }
  }),

  /** @public **/
  formatHtmlMessage: formatter('html-message'),

  /** @public **/
  formatRelative: formatter('relative'),

  /** @public **/
  formatMessage: formatter('message'),

  /** @public **/
  formatNumber: formatter('number'),

  /** @public **/
  formatTime: formatter('time'),

  /** @public **/
  formatDate: formatter('date'),

  /**
   * Returns an array of registered locale names
   *
   * @property locales
   * @public
   */
  locales: computed.readOnly('adapter.locales'),

  /** @public **/
  init() {
    this._super();

    if (typeof Intl === 'undefined') {
      warn(`[ember-intl] Intl API was not found.\nSee: ${links.polyfill}`, false, {
        id: 'ember-intl-undefined-intljs'
      });
    }

    this._owner = getOwner(this);

    this._formatters = {
      'html-message': new FormatHtmlMessage(),
      message: new FormatMessage(),
      relative: new FormatRelative(),
      number: new FormatNumber(),
      time: new FormatTime(),
      date: new FormatDate()
    };

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
        `[ember-intl] project is missing CLDR data\nIf you are asynchronously loading translation,
        see: ${links.asyncTranslations}.`,
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
    return Object.keys(requirejs.entries).filter(key => {
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
  lookup(key, localeName, options = {}) {
    const localeNames = this._localeWithDefault(localeName);
    const translation = get(this, 'adapter').lookup(localeNames, key);

    if (!options.resilient && translation === undefined) {
      const missingMessage = this._owner.resolveRegistration('util:intl/missing-message');

      return missingMessage.call(this, key, localeNames);
    }

    return translation;
  },

  /** @public **/
  t(key, ...args) {
    const [options] = args;
    const translation = this.lookup(key, options && options.locale, {
      resilient: options && typeof options.fallback === 'string'
    });

    const value = typeof translation === 'string' ? translation : options.fallback;

    if (options && options.htmlSafe) {
      return this.formatHtmlMessage(value, ...args);
    }

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

  /** @public **/
  getLocalesByTranslations() {
    deprecate('[ember-intl] `getLocalesByTranslations` is deprecated, use `locales` computed property', false, {
      id: 'ember-intl-locales-cp',
      until: '3.0.0'
    });

    return get(this, 'locales');
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
    const locale = this.localeFactory(localeName);

    return locale.addTranslation(key, value);
  },

  /** @public **/
  addTranslations(localeName, payload) {
    const locale = this.localeFactory(localeName);

    return locale.addTranslations(payload);
  },

  /** @public **/
  setLocale(localeName) {
    const proposed = makeArray(localeName).map(normalizeLocale);
    const current = get(this, '_locale');

    if (!isArrayEqual(proposed, current)) {
      set(this, '_locale', proposed);
      this.notifyPropertyChange('locale');
      this.trigger('localeChanged');
    }
  },

  /** @private **/
  getFormat(formatType, format) {
    const formats = get(this, 'formats');

    if (formats && formatType && typeof format === 'string') {
      return get(formats, `${formatType}.${format}`);
    }
  },

  /** @public **/
  localeFactory(localeName) {
    return get(this, 'adapter').localeFactory(normalizeLocale(localeName), true);
  },

  /** @public **/
  createLocale(localeName, payload) {
    deprecate('[ember-intl] `createLocale` is deprecated, use `addTranslations`', false, {
      id: 'ember-intl-create-locale',
      until: '3.0.0'
    });

    return this.addTranslations(localeName, payload);
  },

  /** @public **/
  findTranslationByKey(key, localeName, options) {
    return this.lookup(key, localeName, options);
  },

  /** @public **/
  translationsFor(localeName) {
    return this.localeFactory(localeName);
  }
});

export default IntlService;
