/**
 * Import this file as the first thing in your `.eslintrc.js`.
 *
 * ```js
 * 'use strict';
 *
 * require('@shared-configs/eslint-config-node/patch');
 *
 * module.exports = {
 *   extends: ['@shared-configs/eslint-config-node/typescript'],
 * };
 * ```
 *
 * This fixes eslint's broken module resolution algorithm, allowing us to
 * reference plugins declared as dependencies of this package.
 *
 * @see {@link https://github.com/microsoft/rushstack/tree/main/eslint/eslint-config#readme}
 */
require('@rushstack/eslint-patch/modern-module-resolution');
