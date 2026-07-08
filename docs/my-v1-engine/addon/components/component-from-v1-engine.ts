import templateOnlyComponent from '@ember/component/template-only';

interface ComponentFromV1EngineSignature {
  Args: {};
}

const ComponentFromV1EngineComponent =
  templateOnlyComponent<ComponentFromV1EngineSignature>();

export default ComponentFromV1EngineComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'component-from-v1-engine': typeof ComponentFromV1EngineComponent;
    ComponentFromV1Engine: typeof ComponentFromV1EngineComponent;
  }
}
