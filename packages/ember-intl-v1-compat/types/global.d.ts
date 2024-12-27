// Types for compiled templates
declare module 'ember-intl-v1-compat/templates/*' {
  import type { TemplateFactory } from 'ember-cli-htmlbars';
  const tmpl: TemplateFactory;
  export default tmpl;
}
