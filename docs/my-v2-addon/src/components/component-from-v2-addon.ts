import templateOnlyComponent from '@ember/component/template-only';

interface ComponentFromV2AddonSignature {
  Args: {};
}

const ComponentFromV2AddonComponent =
  templateOnlyComponent<ComponentFromV2AddonSignature>();

export default ComponentFromV2AddonComponent;
