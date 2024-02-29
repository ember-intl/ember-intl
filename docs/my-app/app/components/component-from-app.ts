import templateOnlyComponent from '@ember/component/template-only';

interface ComponentFromAppSignature {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Args: {};
}

const ComponentFromAppComponent =
  templateOnlyComponent<ComponentFromAppSignature>();

export default ComponentFromAppComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ComponentFromApp: typeof ComponentFromAppComponent;
  }
}
