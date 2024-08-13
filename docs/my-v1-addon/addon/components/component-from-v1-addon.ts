import templateOnlyComponent from '@ember/component/template-only';

interface ComponentFromV1AddonSignature {
  Args: {};
}

const ComponentFromV1AddonComponent =
  templateOnlyComponent<ComponentFromV1AddonSignature>();

export default ComponentFromV1AddonComponent;
