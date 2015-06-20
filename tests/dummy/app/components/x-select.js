// app/components/my-select.js
import Ember from "ember";

export default Ember.Component.extend({
    options: [],
    value: null,

    actions: {
        change() {
            let changeAction = this.get('action');
            let selectedEl = this.$('select')[0];
            let selectedIndex = selectedEl.selectedIndex;
            let options = this.get('options');
            let value = options[selectedIndex];

            this.set('value', value);

            if (typeof changeAction === 'function') {
                changeAction(value);
            }
        }
    }
});
