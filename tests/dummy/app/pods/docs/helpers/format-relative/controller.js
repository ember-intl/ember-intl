// BEGIN-SNIPPET docs-helpers-format-relative-controller.js

import Controller from '@ember/controller';

const date = new Date();
const yesterday = date.setDate(date.getDate() - 1);

export default class extends Controller {
  yesterday = yesterday;
  instant = new Date();
  now = new Date();
}
// END-SNIPPET
