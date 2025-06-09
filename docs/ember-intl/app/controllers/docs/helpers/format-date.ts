import Controller from '@ember/controller';

export default class DocsHelpersFormatDateController extends Controller {
  get today(): Date {
    return new Date();
  }

  get yesterday(): Date {
    return new Date(this.today.valueOf() - 24 * 60 * 60 * 1000);
  }
}
