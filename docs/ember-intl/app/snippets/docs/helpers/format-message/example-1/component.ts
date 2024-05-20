// BEGIN-SNIPPET docs__helpers__format-message__example-1__example.ts
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

  get yesterday(): number {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);

    return yesterday;
  }
}
// END-SNIPPET
