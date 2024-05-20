import Controller from '@ember/controller';

export default class DocsHelpersFormatListController extends Controller {
  get letters(): string[] {
    return ['A', 'B', 'C'];
  }
}
