// is-equal helper is necessary to determine which option is currently selected.
// app/helpers/is-equal.js
import Ember from "ember";

export default Ember.Helper.helper(function([leftSide, rightSide]) {
    return leftSide === rightSide;
});
