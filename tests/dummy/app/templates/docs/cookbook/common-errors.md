# Common errors

## date value is not finite in DateTimeFormat.format()

Browser vendors implement date/time parsing differently.  For example, the following will parse correctly in Chrome but fail in Firefox: `new Intl.DateTimeFormat().format('2015-04-21 20:47:31 GMT');`

The solution is the ensure that the value you are passing in is in a format which is valid for the `Date` constructor.  This library currently does not try and normalize date strings outside of what the browser already implements.