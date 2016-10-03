import Ember from 'ember';
import links from '../utils/links';

const { inject } = Ember;

export default Ember.Component.extend({
  tagName: 'span',

  intl: inject.service(),

  init: Ember.on('init', function() {
    this._super(...arguments);

    let key = this.get('t');
    let locale = this.get('locale') || this.get('intl._locale');

    if (!key) {
      throw new Error(
        `No translation specified.`
      );
    }

    if (!locale) {
      throw new Error(
        `No locale specified.  This is typically done application-wide within routes/application.js. Documentation: ${links.unsetLocale}`
      );
    }

    let str = this.get('intl').findTranslationByKey(key, locale);
    this.set('segments', str.split('{yield}'));
    console.log(this.get('segments'));
  })
});
