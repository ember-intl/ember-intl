function findMissingIcuArguments(key, data) {
  const { allIcuArguments, locales, localeToIcuArguments } = data;
  const icuArguments = Array.from(allIcuArguments[key]);

  const result = [];

  locales.forEach((locale) => {
    const missingIcuArguments = icuArguments.filter((icuArgument) => {
      return !localeToIcuArguments[locale][key].includes(icuArgument);
    });

    if (missingIcuArguments.length > 0) {
      result.push([locale, missingIcuArguments]);
    }
  });

  return result;
}

module.exports = findMissingIcuArguments;
