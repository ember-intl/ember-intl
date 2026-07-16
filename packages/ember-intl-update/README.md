# @ember-intl/update

_Codemod to update `ember-intl` to the next major version_


## Usage

Step 1. Run codemod.

```sh
cd <path/to/your/project>
pnpx @ember-intl/update <arguments>
```

Step 2. Address the remaining breaking changes listed in the [documentation site](https://ember-intl.github.io/ember-intl/).


### Arguments

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
pnpx @ember-intl/update --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical cases. It is not designed to cover one-off cases.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-intl-update.js --root <path/to/your/project>
```


## Compatibility

- `ember-intl` v6.1.0 or above
- Node.js v22 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](./LICENSE.md).
