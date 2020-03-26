/* globals requirejs */

/**
 * @private
 * @hide
 */
export function lookupByFactoryType(type, modulePrefix) {
  return Object.keys(requirejs.entries).filter((key) => {
    return key.indexOf(`${modulePrefix}/${type}/`) === 0;
  });
}

/**
 * Peeks into the requirejs map and registers all locale data (CLDR & Translations) found.
 *
 * @private
 * @hide
 */
export default function (service, owner) {
  const config = owner.resolveRegistration('config:environment');
  const translations = lookupByFactoryType('translations', config.modulePrefix);

  translations.forEach((moduleName) => {
    const localeName = moduleName.split('/').pop();

    service.addTranslations(localeName, owner.resolveRegistration(`translation:${localeName}`));
  });
}
