import Controller from '@ember/controller';

export default class DocsHelpersFormatMessageController extends Controller {
  get descriptor1() {
    return {
      defaultMessage:
        '{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}.',
      description: 'A summary of the photoshoot from this week',
      id: 'photoshoot-summary',
    };
  }

  get descriptor2() {
    return {
      defaultMessage: '<em>{numPhotos, number} photos taken.</em>',
      description: 'A short summary of the photoshoot from this week',
      id: 'photoshoot-short-summary',
    };
  }

  get today(): Date {
    return new Date();
  }

  get yesterday(): Date {
    return new Date(this.today.valueOf() - 24 * 60 * 60 * 1000);
  }
}
