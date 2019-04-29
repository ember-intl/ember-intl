// BEGIN-SNIPPET docs-helpers-format-message-controller.js

import Controller from '@ember/controller';

const date = new Date();
const yesterday = date.setDate(date.getDate() - 1);
const user = { username: 'Chris' };

export default Controller.extend({
  user: user,
  num: 12,
  yesterday: yesterday
});
// END-SNIPPET
