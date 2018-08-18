import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';

class ApplicationRoute extends Route {
  @service
  intl;

  beforeModel() {
    this.get('intl').setLocale(['en-us']);
  }
}

export default ApplicationRoute;
