# my-v2-app-with-lazy-loaded-translations

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-v2-app-with-lazy-loaded-translations` is a Vite app. We use it to check that `publicOnly: true` works.


## Local development

Before starting the application, build the v2 addons (e.g. `my-v2-addon`) so that you can test the latest code.

```sh
# From the workspace root
pnpm prepare

# Change directory
cd docs/my-v2-app-with-lazy-loaded-translations
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
