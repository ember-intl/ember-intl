{{locale-switcher}}
# Format Number Compact

Formats numbers using [<code>cldr-compact-number</code>](https://github.com/snewcomer/cldr-compact-number), and returns the formatted string value.

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-number-compact-01-template.hbs'}}
    The Cisco DPC3000 has {{format-number-compact num}} customers
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-number-compact-01-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-number-compact-controller.js'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-number-compact-02-template.hbs'}}
    The Cisco DPC3000 has {{format-number-compact num style="oneSignificantDigit"}} customers
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-number-compact-02-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-number-compact-controller.js'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-number-compact-03-template.hbs'}}
    The Cisco DPC3000 has {{format-number-compact num style="twoSignificantDigits"}} customers
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-number-compact-03-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-number-compact-controller.js'}}
{{/docs-demo}}

## Format Number Compact Options
`style`

> The formatting style to use. Possible values are any style under the format "shortNumber" in your formats file.
