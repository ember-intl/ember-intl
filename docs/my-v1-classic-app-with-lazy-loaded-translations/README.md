# my-v1-classic-app-with-lazy-loaded-translations

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-v1-classic-app-with-lazy-loaded-translations` is an Ember app. We use it to check that `publicOnly: true` works on the classic build.


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
