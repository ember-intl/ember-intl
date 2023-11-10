// BEGIN-SNIPPET docs__helpers__format-date__example-2__my-component.js
import Component from '@glimmer/component';

export default class MyComponent extends Component {
  get today() {
    return new Date();
  }
}
// END-SNIPPET
