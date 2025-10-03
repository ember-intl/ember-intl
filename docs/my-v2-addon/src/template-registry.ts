import type ComponentFromV2AddonComponent from './components/component-from-v2-addon.gts';
import type SelectLocaleComponent from './components/select-locale.gts';

export default interface MyV2AddonRegistry {
  ComponentFromV2Addon: typeof ComponentFromV2AddonComponent;
  SelectLocale: typeof SelectLocaleComponent;
}
