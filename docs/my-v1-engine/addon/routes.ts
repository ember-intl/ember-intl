// @ts-expect-error: Cannot find module 'ember-engines/routes' or its corresponding type declarations.
import buildRoutes from 'ember-engines/routes';

export default buildRoutes(function () {
  // @ts-expect-error: 'this' implicitly has an 'any' type because it does not have a type annotation
  this.route('index', { path: '/' });
});
