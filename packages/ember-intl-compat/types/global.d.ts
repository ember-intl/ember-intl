// Types for compiled templates
declare module 'ember-intl-compat/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';
  const tmpl: TemplateFactory;
  export default tmpl;
}
