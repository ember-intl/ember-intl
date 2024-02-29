import Controller from '@ember/controller';

export default class DocsHelpersFormatDateController extends Controller {
  get today(): Date {
    return new Date();
  }

  get yesterday(): number {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);

    return yesterday;
  }
}
