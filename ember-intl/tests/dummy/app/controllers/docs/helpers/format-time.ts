import Controller from '@ember/controller';

export default class DocsHelpersFormatTimeController extends Controller {
  get today() {
    return new Date();
  }
}
