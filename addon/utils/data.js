// ideally these would be imported ..
var IntlMessageFormat  = window.IntlMessageFormat;
var IntlRelativeFormat = window.IntlRelativeFormat;

export function addLocaleData(data) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
}

export {
    IntlRelativeFormat,
    IntlMessageFormat
}