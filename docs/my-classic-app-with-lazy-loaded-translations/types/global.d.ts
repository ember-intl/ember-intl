// Types for compiled templates
declare module 'my-classic-app-with-lazy-loaded-translations/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}
