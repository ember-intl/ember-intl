import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class ExampleTDefault extends Model {
  @service intl;

  @attr message;

  get status() {
    const { message } = this;

    if (!message) {
      return;
    }

    return this.intl.t(message.status, {
      default: 'message.status-unknown',
    });
  }
}
