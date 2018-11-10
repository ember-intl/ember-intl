/* eslint-env node */

'use strict';

function findMissingIcuArguments(key, allIcuArguments, locales, icuArguments) {
  const keyIcuArguments = Array.from(allIcuArguments[key]);
  return locales
    .map(locale => [
      locale,
      keyIcuArguments.filter(
        arg => !icuArguments[locale].hasOwnProperty(key) || !icuArguments[locale][key].includes(arg)
      )
    ])
    .filter(([, missing]) => missing.length > 0);
}

module.exports = findMissingIcuArguments;
