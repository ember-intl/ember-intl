import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  intl: service(),
  beforeModel() {
    this.get('intl').setLocale(['en-us']);
  }
});
