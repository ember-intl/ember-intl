import Ember from 'ember';

var Locale = Ember.Object.extend({
    locale:   Ember.required(),
    messages: {},

    addMessage: function (key, value) {
        this.set('message.' + key, value);

        return value;
    },
    
    addMessages: function (messageObject) {
        var messages = this.get('messages');

        // shallow merge
        for (var key in messageObject) {
            if (messageObject.hasOwnProperty(key)) {
                messages[key] = messageObject[key];
            }
        }

        return messages;
    },
    
    // Exposes an accessor on the locale modules
    // so that if you want to implement your own custom logic
    // for example, this[key] versus Ember.get
    intlGetAccessor: function (key) {
        return this.get(key);
    }
});

export default Locale;
