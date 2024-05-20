# Helpers

`ember-intl` provides several locale-aware helpers, so that you can display translations, numbers, dates, etc. All helpers return a string.

Behind the scenes, the helpers make use of the `intl` service (the source of truth). So, just like the service, the helpers return an empty string when you pass `undefined` or `null`. This relaxation is to help you avoid runtime errors in templates (i.e. in `*.hbs` files, where it can be hard to make early exits and wait for promises to resolve).

```hbs
{{! Display an empty string while @message is loaded }}
{{format-date @message.timestamp}}
```

The helper that you will most frequently use is `{{t}}` (the "t helper" or "translation helper"). You may want to check the [documentation for `{{t}}`](./t) first.

```hbs
{{t "hello.message" (hash name="Zoey")}}
```
