<LocaleSwitcher />

# Format List

Uses [`Intl.ListFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) to join an array of strings into a single value.

<DocsDemo as |demo|>
  <demo.example @name="docs__helpers__format-number__example-1">
    <div>
      Conjunction: {{format-list this.fruits type="conjunction"}}
    </div>
    <div>
      Disjunction: {{format-list this.fruits type="disjunction"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="my-component.hbs"
    @name="docs__helpers__format-list__example-1__my-component.hbs"
  />

  <demo.snippet
    @label="my-component.js"
    @name="docs__helpers__format-list__example-1__my-component.js"
  />
</DocsDemo>


## Format List Options

For a complete, up-to-date list, please check [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat).


### localeMatcher

The locale-matching algorithm to use. Possible values:

- `"best fit"` (default)
- `"lookup"`

For information about this option, see the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation) page.


### type

Indicates the type of grouping. Possible values:

- `"conjunction"`, for "and"-based grouping of the list items: "A, B, and C" (default)
- `"disjunction"`, for "or"-based grouping of the list items: "A, B, or C"
- `"unit"`, for grouping the list items as a unit (neither "and"-based nor "or"-based): "A, B, C" (e.g., "5 pounds, 12 ounces")


### style

Indicates the grouping style (for example, whether list separators and conjunctions are included). Possible values:

- `"long"`: "A, B, and C" (default)
- `"short"`: "A, B, C"
- `"narrow"`: "A B C"