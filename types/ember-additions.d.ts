import 'ember';
import '@ember/array';

declare module 'ember' {
  namespace Ember.Handlebars.Utils {
    function escapeExpression(string: unknown): string;
  }
}

declare module '@ember/array' {
  function makeArray(obj: unknown | null | undefined): Array<unknown | null | undefined>;
}
