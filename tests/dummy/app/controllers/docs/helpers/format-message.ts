import Controller from '@ember/controller';

export default class DocsHelpersFormatMessageController extends Controller {
  customMessage =
    '{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}.';

  get today() {
    return new Date();
  }

  get yesterday() {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);

    return yesterday;
  }
}
