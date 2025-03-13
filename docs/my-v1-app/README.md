# my-v1-app

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-v1-app` is an Embroider app. We use it to check the default configuration of `ember-intl`.

The app also helps ensure that `ember-intl` is compatible with "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [TypeScript](https://www.typescriptlang.org/docs/) + [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)

In addition, the application tests serve as a living documentation that translations can be provided by apps, v1 addons, or v2 addons.


## Local development

Before starting the application, build the v2 addons (e.g. `my-v2-addon`) so that you can test the latest code.

```sh
# From the workspace root
pnpm prepare

# Change directory
cd docs/my-v1-app
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
