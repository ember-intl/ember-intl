import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class ExampleFormatDateAllowEmpty extends Model {
  @service intl;

  @attr message;

  get sendDate() {
    const { message } = this;

    return this.intl.formatDate(message?.timestamp, {
      allowEmpty: true,
    });
  }
}
