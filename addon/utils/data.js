/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

// ideally these would be imported as node modules
var IntlMessageFormat  = window.IntlMessageFormat;
var IntlRelativeFormat = window.IntlRelativeFormat;

export function addLocaleData (data) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
}

export {
    IntlRelativeFormat,
    IntlMessageFormat
};
