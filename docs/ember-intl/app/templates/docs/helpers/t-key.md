# &#123;&#123;t-key&#125;&#125;

`{{t-key}}` helps programs (e.g. linters, codemods) identify strings that are translation keys. It is an identity function, i.e. `{{t-key}}` returns the input string and its type unchanged.

<DocsDemo as |demo|>
  <demo.snippet
    @label="components/select-locale.hbs"
    @name="docs__helpers__t-key__example-1__example.hbs"
  />

  <demo.snippet
    @label="components/select-locale.ts"
    @name="docs__helpers__t-key__example-1__example.ts"
  />
</DocsDemo>

<DocsDemo as |demo|>
  <demo.snippet
    @label="components/payment-method.hbs"
    @name="docs__helpers__t-key__example-2__example.hbs"
  />

  <demo.snippet
    @label="components/payment-method.ts"
    @name="docs__helpers__t-key__example-2__example.ts"
  />

  <demo.snippet
    @label="utils/payment.ts"
    @name="docs__helpers__t-key__example-2__util.ts"
  />
</DocsDemo>


## What not to do

Don't pass a dynamic expression to `{{t-key}}`. It's difficult and costly for programs to accurately find all possible values.

```hbs
{{#let
  (array
    (hash labelKey="components.select-locale.option.de-de" value="de-de")
    (hash labelKey="components.select-locale.option.en-us" value="en-us")
  ) as |options|
}}
  {{#each options as |opt|}}
    <option value={{opt.value}}>
      {{! ❌ Path expressions like `opt.labelKey` may be ignored }}
      {{t (t-key opt.labelKey)}}
    </option>
  {{/each}}
{{/let}}
```

```hbs
{{#let (array "de-de" "en-us") as |locales|}}
  {{#each locales as |locale|}}
    <option value={{locale}}>
      {{!-- ❌ Helpers like {{concat}} may be ignored --}}
      {{t (t-key (concat "components.select-locale.option." locale))}}
    </option>
  {{/each}}
{{/let}}
```

Refactor code so that you always pass strings (string literals) to `{{t-key}}`.
