// BEGIN-SNIPPET docs__helpers__t__example-1__my-component.js
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MyComponent extends Component {
  @tracked numPhotos = 0;

  @action addPhoto() {
    this.numPhotos++;
  }

  @action deletePhoto() {
    if (this.numPhotos === 0) {
      return;
    }

    this.numPhotos--;
  }
}
// END-SNIPPET
