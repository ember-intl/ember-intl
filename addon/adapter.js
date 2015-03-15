import Ember from 'ember';

function notImplemented () {
    throw new Error('not implemented');
}

export default Ember.Object.extend({
    findLanguage:    notImplemented,
    findTranslation: notImplemented
});
