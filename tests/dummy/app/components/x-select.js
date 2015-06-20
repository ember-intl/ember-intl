// app/components/my-select.js
import Ember from "ember";

var get = Ember.get;

export default Ember.Component.extend({
    options: [],
    value: null,

    actions: {
        change() {
            let changeAction = get(this, 'action');
            let selectedEl = this.$('select')[0];
            let selectedIndex = selectedEl.selectedIndex;
            let options = get(this, 'options');
            let value = options[selectedIndex];

            this.set('value', value);

            if (typeof changeAction === 'function') {
                changeAction(value);
            }
        }
    }
});
