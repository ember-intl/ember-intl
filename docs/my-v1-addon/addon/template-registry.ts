import type ComponentFromV1AddonComponent from './components/component-from-v1-addon';

export default interface MyV1AddonRegistry {
  ComponentFromV1Addon: typeof ComponentFromV1AddonComponent;
}
