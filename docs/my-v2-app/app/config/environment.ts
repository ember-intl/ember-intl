import loadConfigFromMeta from '@embroider/config-meta-loader';

interface Config {
  APP: Record<string, unknown>;
  environment: string;
  locationType: 'history' | 'hash' | 'none';
  modulePrefix: string;
  podModulePrefix: string;
  rootURL: string;
}

export default loadConfigFromMeta('my-v2-app') as Config;
