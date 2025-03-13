import templateOnlyComponent from '@ember/component/template-only';

interface ComponentFromAppSignature {
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
