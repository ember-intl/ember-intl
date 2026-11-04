export default {
  lintOptions: {
    dependencies: {
      t: [{ importName: 't', importPath: 'my-app/utils/intl' }],
      tKey: [{ importName: 'tKey', importPath: 'my-app/utils/intl' }],
    },
  },
};
