// BEGIN-SNIPPET docs-helpers-format-t-controller.js

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class extends Controller {
  @tracked count = 0;

  @action
  inc(count) {
    this.count = count + 1;
  }

  @action
  dec(count) {
    if (count <= 0) return;
    this.count = count - 1;
  }
}
// END-SNIPPET
