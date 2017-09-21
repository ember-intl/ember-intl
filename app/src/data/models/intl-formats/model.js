import Ember from 'ember';

Ember.Logger.warn(
  `You are using a resolver with module unification support but have not relocated \`app/formats.js\` module to \`app/data/models/intl-formats/model.js\`.`
);

export default {};
