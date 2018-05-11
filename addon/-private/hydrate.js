import { warn } from '@ember/debug';
import links from '../utils/links';

/**
 * Peeks into the requirejs map and registers all locale data (CLDR & Translations) found.
 *
 * @private
 */
export default function(service, owner) {
  const config = owner.resolveRegistration('config:environment');
  const cldrs = service._lookupByFactoryType('cldrs', config.modulePrefix);
  const translations = service._lookupByFactoryType('translations', config.modulePrefix);

  if (!cldrs.length) {
    warn(
      `[ember-intl] project is missing CLDR data\nIf you are asynchronously loading translation,
      see: ${links.asyncTranslations}.`,
      false,
      {
        id: 'ember-intl-missing-cldr-data'
      }
    );
  }

  cldrs
    .map(moduleName => {
      return owner.resolveRegistration(`cldr:${moduleName.split('/').pop()}`);
    })
    .forEach(data => data.forEach(service.addLocaleData));

  translations.forEach(moduleName => {
    const localeName = moduleName.split('/').pop();

    service.addTranslations(localeName, owner.resolveRegistration(`translation:${localeName}`));
  });
}
