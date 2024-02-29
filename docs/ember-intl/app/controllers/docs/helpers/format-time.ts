import Controller from '@ember/controller';

export default class DocsHelpersFormatTimeController extends Controller {
  get today(): Date {
    return new Date();
  }
}
