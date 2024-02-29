// BEGIN-SNIPPET docs__helpers__format-message__example-1__my-component.js
import Component from '@glimmer/controller';

export default class DocsHelpersFormatMessageComponent extends Component {
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
// END-SNIPPET
