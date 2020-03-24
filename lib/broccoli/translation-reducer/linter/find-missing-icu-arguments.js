function findMissingIcuArguments(key, allIcuArguments, locales, icuArguments) {
  const keyIcuArguments = Array.from(allIcuArguments[key]);
  return locales
    .map(locale => {
      let filteredArgs = keyIcuArguments.filter(arg => {
        let missingProp = !Object.prototype.hasOwnProperty.call(icuArguments[locale], key);
        return missingProp || !icuArguments[locale][key].includes(arg);
      });

      return [locale, filteredArgs];
    })
    .filter(([, missing]) => missing.length > 0);
}

module.exports = findMissingIcuArguments;
