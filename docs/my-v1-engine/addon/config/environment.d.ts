/**
 * Type declarations for
 *    import config from './config/environment'
 */
declare const config: {
  environment: string;
  locationType: 'hash' | 'history' | 'none';
  modulePrefix: string;
  podModulePrefix: string;
  rootURL: string;
};

export default config;
