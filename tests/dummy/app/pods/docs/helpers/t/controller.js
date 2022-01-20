// BEGIN-SNIPPET docs-helpers-format-t-controller.js

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class extends Controller {
  @tracked count = 0;

  @action
  increment() {
    this.count++;
  }

  @action
  decrement() {
    if (this.count <= 0) return;
    this.count--;
  }
}
// END-SNIPPET
