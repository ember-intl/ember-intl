import templateOnlyComponent from '@ember/component/template-only';

interface ComponentFromV1AddonSignature {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Args: {};
}

const ComponentFromV1AddonComponent =
  templateOnlyComponent<ComponentFromV1AddonSignature>();

export default ComponentFromV1AddonComponent;
