module.exports = {
  extends: ['stylelint-config-halo-lab'],
  ignoreFiles: ['src/**/_*.scss', 'src/**/_*.css'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'ignores', 'use', 'mixin', 'include'],
      },
    ],
  },
};
