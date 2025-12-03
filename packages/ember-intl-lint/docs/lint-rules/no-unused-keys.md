# no-unused-keys

## Why use it?

The rule finds translation keys that are defined in a translation file (yours), but aren't used in the source code.


## Options for `lintRules`

### ignores

Ignore keys that fail this rule.

```js
'no-unused-keys': {
  ignores: ['hello.message']
}
```
