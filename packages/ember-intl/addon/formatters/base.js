import Ember from 'ember';

const FormatterBase = Ember.Object.extend({
  compute(/* value, options, ctx = {} */) {
    throw new Error('`compute` was not implemented and is required for formatters');
  }
});

export default FormatterBase;
