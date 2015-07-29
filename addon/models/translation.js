/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get, set, Logger:logger } = Ember;

let TranslationModel = Ember.Object.extend({
    addTranslation(key, value) {
        set(this, key, value);
        return value;
    },

    addTranslations(messageObject) {
      const messages = this;

      // shallow merge intentional
      for (let key in messageObject) {
          if (messageObject.hasOwnProperty(key)) {
              messages[key] = messageObject[key];
          }
      }

      return messages;
    },

    addMessage() {
        logger.warn('`addMessage` is deprecated in favor of `addTranslation`');
        return this.addTranslation(...arguments);
    },

    addMessages() {
        logger.warn('`addMessages` is deprecated in favor of `addTranslations`');
        return this.addTranslations(...arguments);
    },

    // Exposes an accesor on the locale modules
    // so that if you want to implement your own custom logic
    // for example, this[key] versus Ember.get
    getValue(key) {
        return get(this, key);
    }
});

export default TranslationModel;
