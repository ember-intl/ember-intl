
Asynchronously loading translations
==============================================================================

## Writing Translations to `dist`

By default, translations stored in `<project root>/translations` will be bundled into your application.  This is likely not optimal for many.  If need more control over which translations are loaded and how, set `publicOnly` to `true`.

At build time, translations will be now written to the `dist` output path instead of bundled within `app.js`.  For an example of how to load these translations at runtime, continue reading the section below.

```js
// config/ember-intl.js
module.exports = function() {
  return {
    publicOnly: true
  }
};
```

## Asynchronous loading of translations

Manually configure ember-intl with the list of locales the application needs to support.  This is an important step, since at build time we use this information to specific CLDR data for each locale.  NOTE: If the translations are managed by ember-intl, i.e. stored in `/translations`, this step is not needed.

```js
// config/ember-intl.js
module.exports = function() {
  return {
    locales: ['en-us', 'en-ca', 'es-es', 'fr-fr']
  }
};
```

### Pushing translations into ember-intl

```js
// app/routes/application.js
export default Ember.Route.extend({
  intl: Ember.inject.service(),
  beforeModel() {
    const intl = this.get('intl');

    return fetch('/custom-api/translations/?loc[0]=en-ca&loc[1]=en-us').then((hash) => {
      return Ember.RSVP.all([
        intl.addTranslations('en-us', hash['en-us']),
        intl.addTranslations('en-ca', hash['en-ca'])
      ]).then(() => {
        // en-ca is primary, en-us is fallback
        intl.setLocale(['en-ca', 'en-us']);
      });
    });
  }
});
```
