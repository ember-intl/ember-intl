import templateOnlyComponent from '@ember/component/template-only';

interface LazyHelloSignature {
  Args: {
    name: string;
  };
}

const LazyHelloComponent = templateOnlyComponent<LazyHelloSignature>();

export default LazyHelloComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    LazyHello: typeof LazyHelloComponent;
  }
}
