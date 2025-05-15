# Alternative Syntax

## Key based translations

`ember-intl` makes heavy use of [FormatJS](https://formatjs.github.io/) to provide most of its functionality. The default way to provide translations for `ember-intl` is to use "Key Based" translations e.g. 

```hbs
{{t "some.key.for.translation"}}
``` 

Where the nested key `some.key.for.translation` exists in your json or yaml translation files. This key-based system is useful for organising your translations but can sometimes provide a challenge for teams to manage. 

FormatJS [recommends that you don't use an ID-based workflow](https://formatjs.github.io/docs/getting-started/message-declaration), and instead they recommend that you declared your messages inline and make use of their extraction workflow.

## Inline Translations

If you want to make use of the recommended FormatJS workflow of inline translation strings you can install [ember-formatjs](https://github.com/mainmatter/ember-formatjs) which automatically bridges the gap between the FormatJS style of declaring translation strings and EmberIntl's APIs.

After installing `ember-formatjs` you can use the `{{format-message}}` helper like this: 

```hbs
{{format-message 'Hello!'}}
```

and that will be automatically converted to use the `{{t}}` helper at build time like this: 

```hbs
{{t "OpKKos"}}
```

The `OpKKos` key is an automatically interpolated ID that is produced by FormatJS for you. You can [automatically extract your default translation file](https://formatjs.github.io/docs/getting-started/message-extraction#automatic-id-generation) by using the `@formatjs/cli` package and then that translation file can be uploaded to your TMS of choice or you can choose to manage the translation files locally if you prefer.

You can read more detail about this in the [Extract and Compile](https://github.com/mainmatter/ember-formatjs?tab=readme-ov-file#extract-and-compile) section of the ember-formatjs README.



