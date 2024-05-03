// Types for compiled templates
declare module 'my-app-with-namespace-from-folders/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}
