# my-v1-app

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-v1-app` is an Embroider app built with Webpack. We use it to test `ember-intl` with the default build options.

The app also helps ensure that `ember-intl` is compatible with "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [TypeScript](https://www.typescriptlang.org/docs/) + [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)

In addition, the application tests serve as a living documentation that translations can be provided by apps, v1 addons, or v2 addons.


## Local development

> [!NOTE]
>
> To run the commands below, some packages in this monorepo must be built first.
>
> ```sh
> # From the workspace root
> pnpm prepare
> ```

```sh
# Run the app
pnpm start

# Lint files
pnpm lint
pnpm lint:fix

# Run tests
pnpm test
```
