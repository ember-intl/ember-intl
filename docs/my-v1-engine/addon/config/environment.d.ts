/**
 * Type declarations for
 *    import config from './config/environment'
 */
declare const config: {
  environment: string;
  locationType: 'history' | 'hash' | 'none';
  modulePrefix: string;
  podModulePrefix: string;
  rootURL: string;
};

export default config;
