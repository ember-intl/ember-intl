{{locale-switcher}}
# Format Message

Formats [ICU message syntax](https://formatjs.io/docs/core-concepts/icu-syntax) strings with the provided values passed as arguments to the helper/method.

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-message-01-template.hbs'}}
    {{format-message "{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}"
             name=user.username
             numPhotos=num
             timestamp=yesterday}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-message-01-template.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-message-02-template.hbs'}}
    {{format-message "{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}"
             name=user.username
             numPhotos=1
             timestamp=yesterday}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-message-02-template.hbs'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-message-03-template.hbs'}}
    {{format-message "{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}"
             name=user.username
             numPhotos=0
             timestamp=yesterday}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-message-03-template.hbs'}}
{{/docs-demo}}

## Format HTML Message

To enable rendering HTML within translations, pass an `htmlSafe` attribute to the `format-message` helper.

```hbs
{{format-message "'<em>'{photos, number}'</em>'" photos=models.photos.length htmlSafe=true}}
```

It will escape all hash arguments and returns as an htmlSafe String which renders an ElementNode.  

## Service API

```js
export default Component.extend({
  intl: service(),
  count: 0,
  label: computed('intl.locale', 'model.photos.length', function() {
    return this.intl.formatMessage(`
      You took {numPhotos, plural,
        =0 {no photos}
        =1 {one photo}
        other {# photos}
      }
    `,
    {
      numPhotos: this.get('model.photos.length')
    });
  }).readOnly()
});
```

{{docs-link 'More details here' 'docs.guide.service-api'}}
