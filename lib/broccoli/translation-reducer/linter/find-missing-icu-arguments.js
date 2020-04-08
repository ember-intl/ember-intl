function findMissingIcuArguments(key, allIcuArguments, locales, icuArguments, requiresTranslation) {
  const keyIcuArguments = Array.from(allIcuArguments[key]);
  return locales
    .map(locale => {
      let filteredArgs = keyIcuArguments.filter(arg => {
        let missingProp = !Object.prototype.hasOwnProperty.call(icuArguments[locale], key);
        return missingProp || !icuArguments[locale][key].includes(arg);
      });

      return [locale, filteredArgs];
    })
    .filter(([locale, missing]) => missing.length > 0 && requiresTranslation(key, locale));
}

module.exports = findMissingIcuArguments;
