/**
 * Type declarations for
 *    import config from 'my-app-with-fallbacks/config/environment'
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
