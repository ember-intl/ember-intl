{{locale-switcher}}
# Format Time

This is just like the `{{format-date}}` helper, except it will reference any string-named format from `formats.time`.

{{format-time this.instant format='hhmmss'}}

```hbs
{{format-time this.instant format='hhmmss'}}
```

{{format-time this.instant hour='numeric' second='numeric' minute='numeric' hour12=false}}

```hbs
{{format-time this.instant hour='numeric' second='numeric' minute='numeric' hour12=false}}
```

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

`hourCycle`

> The hour cycle to use. Possible values are "h11", "h12", "h23", or "h24".
> This option overrides the hc language tag, if both are present, and the
> hour12 option takes precedence in case both options have been specified.
