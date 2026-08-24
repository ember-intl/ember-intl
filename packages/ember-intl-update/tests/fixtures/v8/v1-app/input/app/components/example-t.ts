import templateOnlyComponent from '@ember/component/template-only';

interface ExampleTSignature {
  Args: {
    name: string;
  };
}

const ExampleT = templateOnlyComponent<ExampleTSignature>();

export default ExampleT;
