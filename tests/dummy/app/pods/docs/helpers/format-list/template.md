{{locale-switcher}}
# Format List

Format a list of string into a single value.


{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-list-01-template.hbs'}}
    {{format-list example}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-list-01-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-list-controller.js'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-list-02-template.hbs'}}
    {{format-list example type='disjunction'}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-list-02-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-list-controller.js'}}
{{/docs-demo}}

## Format List Options
`localeMatcher`

> The locale matching algorithm to use. Possible values are "lookup" and
> "best fit"; the default is "best fit". For information about this option,
> see the Intl page.

`type`

> The format of output message. Possible values are "conjunction" that stands for "and"-based lists (default, e.g., "A, B, and C"), or "disjunction" that stands for "or"-based lists (e.g., "A, B, or C"). "unit" stands for lists of values with units (e.g., "5 pounds, 12 ounces").


`style`

> The length of the formatted message. Possible values are: "long" (default, e.g., "A, B, and C"); "short" (e.g., "A, B, C"), or "narrow" (e.g., "A B C"). When style is "short" or "narrow", "unit" is the only allowed value for the type option.