<LocaleSwitcher />

# Format Number

Formats numbers using [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) and returns the formatted value as a string.

<DocsDemo as |demo|>
  <demo.example @name="docs__helpers__format-number__example-1">
    <div>
      As number: {{format-number 1000}}
    </div>
    <div>
      As currency: {{format-number 1000 currency="USD" style="currency"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="my-component.hbs"
    @name="docs__helpers__format-number__example-1__my-component.hbs"
  />
</DocsDemo>


## Format Number Options

For a complete, up-to-date list, please check [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).


### localeMatcher

The locale matching algorithm to use. Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`. For information about this option, see the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation) page.


### style

The formatting style to use. The default is `"decimal"`.

- `"decimal"` for plain number formatting.
- `"currency"` for currency formatting.
- `"percent"` for percent formatting
- `"unit"` for unit formatting


### currency

The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as `"USD"` for the US dollar, `"EUR"` for the euro, or `"CNY"` for the Chinese RMB — see the [Current currency & funds code list](https://www.six-group.com/en/products-services/financial-information/data-standards.html#scrollTo=currency-codes). There is no default value; if the style is `"currency"`, the currency property must be provided.