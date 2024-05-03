/**
 * Type declarations for
 *    import config from 'my-app-with-lazy-loaded-translations/config/environment'
 */
declare const config: {
  APP: Record<string, unknown>;
  environment: string;
  locationType: 'history' | 'hash' | 'none';
  modulePrefix: string;
  podModulePrefix: string;
  rootURL: string;
};

export default config;
