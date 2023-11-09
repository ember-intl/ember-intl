import Controller from '@ember/controller';

export default class DocsHelpersFormatDateController extends Controller {
  get today() {
    return new Date();
  }

  get yesterday() {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);

    return yesterday;
  }
}
