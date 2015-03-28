/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var LocaleModel = Ember.Object.extend({
    locale:   Ember.required(),

    addMessage: function (key, value) {
        this.set(key, value);

        return value;
    },

    addMessages: function (messageObject) {
        var messages = this;

        // shallow merge intentional
        for (var key in messageObject) {
            if (messageObject.hasOwnProperty(key)) {
                messages[key] = messageObject[key];
            }
        }

        return messages;
    },

    // Exposes an accesor on the locale modules
    // so that if you want to implement your own custom logic
    // for example, this[key] versus Ember.get
    getValue: function (key) {
        return this.get(key);
    }
});

export default LocaleModel;
