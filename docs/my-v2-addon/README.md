# my-v2-addon

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-v2-addon` is a v2 addon. We use it to show that v2 addons can provide translations.


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
# Run the addon
pnpm start

# Lint files
pnpm lint
pnpm lint:fix

# Run tests
pnpm test
```
