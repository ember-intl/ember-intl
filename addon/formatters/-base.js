/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import arrayToHash from '../utils/array-to-hash';
import links from '../utils/links';

const {
  get,
  String:emberString,
  Object:EmberObject
} = Ember;

const { camelize } = emberString;

const FormatterBase = EmberObject.extend({
  options: null,

  init() {
    this._super();

    if (this.constructor === FormatterBase) {
      throw new Error('FormatHelper is an abstract class, can not be instantiated directly.');
    }

    this.options = arrayToHash(this.constructor.supportedOptions);
  },

  /**
  * Filters out all of the whitelisted formatter options
  *
  * @method filterSupporedOptions
  * @param {Object} Options object
  * @return {Object} Options object containing just whitelisted options
  * @private
  */
  filterSupporedOptions(input = {}) {
    const out = {};

    let foundMatch = false;
    let camelizedKey;

    for (let key in input) {
      camelizedKey = camelize(key);
      if (this.options[camelizedKey]) {
        foundMatch = true;
        out[camelizedKey] = input[key];
      }
    }

    if (foundMatch) {
      return out;
    }
  },

  format() {
    throw new Error('not implemented');
  },

  /**
  * Invokes the Intl formatter methods
  *
  * @method _format
  * @param {value} Raw input value that needs formatting
  * @return {Object} Formatter options hash
  * @return {Object} Format options hash
  * @private
  */
  _format(value, formatterOptions = {}, formatOptions = {}, ctx = {}) {
    const { locale } = ctx;

    if (!locale) {
      throw new Error(
        `No locale specified.  This is typically done application-wide within routes/application.js. Documentation: ${links.unsetLocale}`
      );
    }

    return get(this, 'formatter')(locale, formatterOptions).format(value, formatOptions);
  }
});

FormatterBase.reopenClass({
  supportedOptions: ['locale', 'format'],
  concatenatedProperties: ['supportedOptions']
});

export default FormatterBase;
