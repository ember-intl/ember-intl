# my-classic-app

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-classic-app` is an Ember app. We use it to check that `ember-intl` works on the classic build.


## Local development

Before starting the application, build the v2 addons (e.g. `my-v2-addon`) so that you can test the latest code.

```sh
# From the workspace root
pnpm prepare

# Change directory
cd docs/my-classic-app
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
