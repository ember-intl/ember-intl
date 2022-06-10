// BEGIN-SNIPPET docs__helpers__format-time__example-1__my-component.js
import Component from '@glimmer/component';

export default class MyComponent extends Component {
  get today() {
    return new Date();
  }
}
// END-SNIPPET
