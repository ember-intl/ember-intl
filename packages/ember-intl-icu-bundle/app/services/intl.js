import Service from 'ember-intl/services/intl';
import IntlMessageFormat from 'ember-intl-icu-bundle/messageformat';
import IntlRelativeFormat from 'ember-intl-icu-bundle/relativeformat';

export default Service.extend({
  addLocaleData(data) {
    IntlMessageFormat.__addLocaleData(data);
    IntlRelativeFormat.__addLocaleData(data);
  }
});
