/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var LocaleModel = Ember.Object.extend({
    addMessage(key, value) {
        Ember.set(this, key, value);
        return value;
    },

    addMessages(messageObject) {
        let messages = this;

        // shallow merge intentional
        for (let key in messageObject) {
            if (messageObject.hasOwnProperty(key)) {
                messages[key] = messageObject[key];
            }
        }

        return messages;
    },

    // Exposes an accesor on the locale modules
    // so that if you want to implement your own custom logic
    // for example, this[key] versus Ember.get
    getValue(key) {
        return Ember.get(this, key);
    }
});

export default LocaleModel;
