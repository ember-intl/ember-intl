<LocaleSwitcher />

# Format Relative

Formats dates relative to "now" using [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat) and returns the formatted value as a string.

<DocsDemo as |demo|>
  <demo.example @name="docs__helpers__format-relative__example-1">
    <div>
      Past: {{format-relative -1 unit="month"}}
    </div>
    <div>
      Current: {{format-relative 0 unit="day"}}
    </div>
    <div>
      Future: {{format-relative 3 unit="week"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="my-component.hbs"
    @name="docs__helpers__format-relative__example-1__my-component.hbs"
  />
</DocsDemo>


## Format Relative Options

For a complete, up-to-date list, please check [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat).


### localeMatcher

The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". For information about this option, see the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation) page.


### numeric

The format of output message. Possible values are:

- `"always"` (default, e.g., 1 day ago)
- `"auto"` (e.g., yesterday). The "auto" value allows to not always have to use numeric values in the output.


### style

The length of the internationalized message. Possible values are:

- `"long"` (default, e.g., in 1 month)
- `"short"` (e.g., in 1 mo.),
- `"narrow"` (e.g., in 1 mo.). The narrow style could be similar to the short style for some locales.


### unit

Unit to use in the relative time internationalized message. According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format), the possible values are:

- `"year"`
- `"quarter"`
- `"month"`
- `"week"`
- `"day"`
- `"hour"`
- `"minute"`
- `"second"`

Plural forms are also permitted.