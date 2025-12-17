# my-v2-app-with-fallbacks

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-v2-app-with-fallbacks` is an Embroider app built with Vite. We use it to test `ember-intl` with the build option `fallbackLocale`. It also tests the `intl` service methods `setOnFormatjsError()` and `setOnMissingTranslation()`.


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
