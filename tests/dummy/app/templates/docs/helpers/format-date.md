<LocaleSwitcher />

# Format Date

Formats dates using [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) and returns the formatted value as a string. (Try switching the locale by clicking on the toolbar buttons above!)

<DocsDemo as |demo|>
  <demo.example @name="docs__helpers__format-date__example-1">
    <div>
      Today: {{format-date this.today}}
    </div>
    <div>
      Yesterday: {{format-date this.yesterday}}
    </div>
  </demo.example>

  <demo.snippet
    @label="my-component.hbs"
    @name="docs__helpers__format-date__example-1__my-component.hbs"
  />

  <demo.snippet
    @label="my-component.js"
    @name="docs__helpers__format-date__example-1__my-component.js"
  />
</DocsDemo>


## Format Date & Time Options

For a complete, up-to-date list, please check [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat).


### localeMatcher

The locale matching algorithm to use. Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`. For information about this option, see the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation) page.


### timeZone

The time zone to use. The only value implementations must recognize is `"UTC"`; the default is the runtime's default time zone. Implementations may also recognize the time zone names of the [IANA time zone database](https://www.iana.org/time-zones), such as `"Asia/Shanghai"`, `"Asia/Kolkata"`, `"America/New_York"`.


### hour12

Whether to use 12-hour time (as opposed to 24-hour time). Possible values are `true` and `false`; the default is locale dependent. This option overrides the `hc` language tag and/or the `hourCycle` option in case both are present.


### formatMatcher

The format matching algorithm to use. Possible values are `"basic"` and `"best fit"`; the default is `"best fit"`. See the following paragraphs for information about the use of this property.

- `weekday`: The representation of the weekday. Possible values are "narrow", "short", "long".
- `era`: The representation of the era. Possible values are "narrow", "short", "long".
- `year`: The representation of the year. Possible values are "numeric", "2-digit".
- `month`: The representation of the month. Possible values are "numeric", "2-digit", "narrow", "short", "long".
- `day`: The representation of the day. Possible values are "numeric", "2-digit".
- `hour`: The representation of the hour. Possible values are "numeric", "2-digit".
- `minute`: The representation of the minute. Possible values are "numeric", "2-digit".
- `second`: The representation of the second. Possible values are "numeric", "2-digit".
- `timeZoneName`: The representation of the time zone name. Possible values are "short", "long".
- `hourCycle` The hour cycle to use. Possible values are "h11", "h12", "h23", or "h24". This option overrides the hc language tag, if both are present, and the hour12 option takes precedence in case both options have been specified.


## Custom format

You can create a custom format configuration in `app/formats.js`, and provide its key as `format` named argument's value.

<DocsDemo as |demo|>
  <demo.example @name="docs__helpers__format-date__example-2">
    <div>
      Time: {{format-date this.today format="hhmmss"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="my-component.hbs"
    @name="docs__helpers__format-date__example-2__my-component.hbs"
  />

  <demo.snippet
    @label="my-component.js"
    @name="docs__helpers__format-date__example-2__my-component.js"
  />

  <demo.snippet
    @label="app/format.js"
    @name="docs__helpers__format-date__example-2__app__format.js"
  />
</DocsDemo>