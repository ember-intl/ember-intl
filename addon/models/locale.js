import Ember from 'ember';
import Translation from './translation';

export default Translation.extend({
    init() {
        Ember.Logger.warn('`ember-intl/models/locale` is deprecated in favor of `ember-intl/models/translation`');
    }
});
