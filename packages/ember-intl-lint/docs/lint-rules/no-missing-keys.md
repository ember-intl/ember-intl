# no-missing-keys

## Why use it?

The rule finds missing translation keys. In other words, keys that are used in the source code, but aren't defined in a translation file (neither in yours nor an addon's).


## Options for `lintRules`

### ignores

Ignore keys that fail this rule. You can use strings to do an exact match, or regular expressions to do a partial match.

```js
'no-missing-keys': {
  ignores: ['hello.message'],
},
```
