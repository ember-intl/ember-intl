import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class ExampleFormatTimeAllowEmpty extends Model {
  @service intl;

  @attr message;

  get sendTime() {
    const { message } = this;

    return this.intl.formatTime(message?.timestamp, {
      allowEmpty: true,
    });
  }
}
