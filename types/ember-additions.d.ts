import 'ember';
import '@ember/array';

declare module 'ember' {
  namespace Ember.Handlebars.Utils {
    function escapeExpression(string: any): string;
  }
}

declare module '@ember/array' {
  function makeArray(obj: any | null | undefined): Array<any | null | undefined>;
}
