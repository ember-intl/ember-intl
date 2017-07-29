import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';
import Controller from '@ember/controller';
import { on } from '@ember/object/evented';
import { run as emberRun } from '@ember/runloop';

const date = new Date();
const yesterday = date.setDate(date.getDate() - 1);

export default Controller.extend({
  intl: service(),
  numType: 'currency',
  num: 1000,
  yesterday: yesterday,
  deadline: computed.readOnly('yesterday'),
  instant: new Date(),
  now: new Date(),
  messages: {
    photos:
      '{name} took {numPhotos, plural,\n  =0 {no photos}\n  =1 {one photo}\n  other {# photos}\n} on {takenDate, date, long}.\n'
  },
  cp: computed({
    get() {
      return 'product.info';
    }
  }),
  incrementTime: on('init', function() {
    setInterval(() => {
      emberRun(() => {
        set(this, 'instant', new Date());
        this.incrementProperty('num');
      });
    }, 200);
  })
});
