export default {
  "lintRules": {
    "no-inconsistent-messages": {
      "ignores": [
        "components.translation-with-arguments.message",
        /^routes\.index\./,
        /^routes\.application\./,
        /\.title$/,
        /\.message$/
      ]
    },
    "no-missing-keys": {
      "ignores": [
        "components.title",
        "routes.index.description",
        "routes.index.key-to-overwrite",
        /^routes\.application\./
      ]
    },
    "no-unused-keys": {
      "ignores": [
        "components.component-from-app.message",
        "components.title",
        "routes.index.key-to-overwrite",
        /^components\.translation-with-arguments\./
      ]
    }
  }
};
