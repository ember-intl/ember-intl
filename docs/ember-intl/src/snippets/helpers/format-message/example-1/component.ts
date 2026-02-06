import Component from '@glimmer/component';

export default class ExampleComponent extends Component {
  get descriptor() {
    return {
      defaultMessage:
        '{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}.',
      description: 'A summary of the photoshoot from this week',
      id: 'photoshoot-summary',
    };
  }

  get today(): Date {
    return new Date();
  }

  get yesterday(): Date {
    return new Date(this.today.valueOf() - 24 * 60 * 60 * 1000);
  }
}
