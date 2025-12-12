# no-inconsistent-messages

## Why use it?

The rule finds translation keys whose message is "inconsistent" across the translation files (yours).

A message is consistent if it meets these conditions:

- A message uses the same set of ICU arguments in every translation file.
- A message is defined for every locale.


## Options for `lintRules`

### ignores

Ignore keys that fail this rule.

```js
'no-inconsistent-messages': {
  ignores: ['hello.message'],
},
```
