import Ember from 'ember';
import { test, skip } from 'qunit';

export default function() {
    if (!Ember.Helper) {
        return skip;
    }

    return test;
}
