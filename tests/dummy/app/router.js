import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  rootURL: config.rootURL,
  location: config.locationType
});

Router.map(function() {
  this.route('smoke');
});

export default Router;
