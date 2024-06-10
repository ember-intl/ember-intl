# my-app-with-fallbacks

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-app-with-fallbacks` is an Embroider app. We use it to check fallbacks for `ember-intl`:

- `fallbackLocale` (from `config/ember-intl.js`)
- `setOnFormatjsError()`
- `setOnMissingTranslation()`


## Local development

Before starting the application, build the v2 addons (e.g. `my-v2-addon`) so that you can test the latest code.

```sh
# From the workspace root
pnpm prepare

# Change directory
cd docs/my-app-with-fallbacks
```

Some useful commands:

```sh
# Run the app
pnpm start

# Lint files
pnpm lint
pnpm lint:fix

# Run tests
pnpm test
```
