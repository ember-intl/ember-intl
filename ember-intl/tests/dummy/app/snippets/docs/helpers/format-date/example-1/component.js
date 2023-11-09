// BEGIN-SNIPPET docs__helpers__format-date__example-1__my-component.js
import Component from '@glimmer/component';

export default class MyComponent extends Component {
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
