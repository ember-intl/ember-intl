{{locale-switcher}}
# Format Date

Formats dates using [<code>Intl.DateTimeFormat</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat), and returns the formatted string value.

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-date-01-template.hbs'}}
    {{format-date instant}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-date-01-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-date-controller.js'}}
{{/docs-demo}}

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-date-02-template.hbs'}}
    {{format-date yesterday}}
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-date-02-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-date-controller.js'}}
{{/docs-demo}}

## Format Date & Time Options
`localeMatcher`

> The locale matching algorithm to use. Possible values are "lookup" and
> "best fit"; the default is "best fit". For information about this option,
> see the Intl page.

`timeZone`

> The time zone to use. The only value implementations must recognize is
> "UTC"; the default is the runtime's default time zone. Implementations may
> also recognize the time zone names of the IANA time zone database, such as
> "Asia/Shanghai", "Asia/Kolkata", "America/New_York".

_Note:_ The Intl.js polyfill does not have full support for `timeZone`
(see [https://github.com/andyearnshaw/Intl.js/issues/19](https://github.com/andyearnshaw/Intl.js/issues/19))

`hour12`

> Whether to use 12-hour time (as opposed to 24-hour time). Possible values
> are `true` and `false`; the default is locale dependent.

`formatMatcher`

> The format matching algorithm to use. Possible values are "basic" and
> "best fit"; the default is "best fit". See the following paragraphs for
> information about the use of this property.

`weekday`

> The representation of the weekday. Possible values are "narrow",
> "short", "long".

`era`

> The representation of the era. Possible values are "narrow", "short",
> "long".

`year`

> The representation of the year. Possible values are "numeric", "2-digit".

`month`

> The representation of the month. Possible values are "numeric", "2-digit",
> "narrow", "short", "long".

`day`

> The representation of the day. Possible values are "numeric", "2-digit".

`hour`

> The representation of the hour. Possible values are "numeric", "2-digit".

`minute`

> The representation of the minute. Possible values are "numeric", "2-digit".

`second`

> The representation of the second. Possible values are "numeric", "2-digit".

`timeZoneName`

> The representation of the time zone name. Possible values are "short",
> "long".
