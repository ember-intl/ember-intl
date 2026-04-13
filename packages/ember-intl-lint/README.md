# @ember-intl/lint

_Official linter for `ember-intl`_


## Quickstart

1\. Install `@ember-intl/lint` as a development dependency.

```sh
pnpm add -D @ember-intl/lint
```

2\. In `package.json`, add the scripts `lint:intl` and `lint:intl:fix`. They will run as a part of `lint` and `lint:fix`.

```diff
{
  "scripts": {
    "lint": "concurrently \"pnpm:lint:*(!fix)\" --names \"lint:\"",
    "lint:fix": "concurrently \"pnpm:lint:*:fix\" --names \"fix:\" && pnpm format",
+     "lint:intl": "ember-intl-lint",
+     "lint:intl:fix": "ember-intl-lint --fix"
  },
  "devDependencies": {
    "@ember-intl/lint": "...",
    "concurrently": "...",
  }
}
```

3\. If `lint:intl` doesn't pass out of the box, [create a configuration file](./docs/configuration.md) to document your app or addon. You may run `lint:intl:fix` to get started.


## Lint Rules

| Name | ✅ | 🔧 |
|:--|--|--|
| [no-inconsistent-messages](./docs/lint-rules/no-inconsistent-messages.md) | ✅ |  |
| [no-missing-keys](./docs/lint-rules/no-missing-keys.md) | ✅ |  |
| [no-unused-keys](./docs/lint-rules/no-unused-keys.md) | ✅ |  |

Notations:

- ✅ Recommended (enabled by default)
- 🔧 Some issues reported by this rule can be fixed (or ignored) with `--fix`


## Compatibility

- `ember-intl` v8.0.0 or above
- Node.js v20 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](./LICENSE.md).
