// BEGIN-SNIPPET docs-helpers-format-t-controller.js

import Controller from '@ember/controller';

export default Controller.extend({
  count: 0,

  actions: {
    inc(count) {
      this.set('count', count + 1);
    },
    dec(count) {
      if (count <= 0) return;
      this.set('count', count - 1);
    }
  }
});
// END-SNIPPET
