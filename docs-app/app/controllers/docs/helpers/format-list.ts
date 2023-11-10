import Controller from '@ember/controller';

export default class DocsHelpersFormatListController extends Controller {
  get fruits(): string[] {
    return ['apples', 'bananas', 'oranges'];
  }
}
