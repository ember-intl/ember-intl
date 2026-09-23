export default {
  "lintRules": {
    "no-inconsistent-messages": {
      "ignores": [
        "components.translation-with-arguments.message",
        /\.message$/
      ]
    },
    "no-missing-keys": {
      "ignores": [
        "routes.index.description"
      ]
    },
    "no-unused-keys": {
      "ignores": [
        "components.component-from-app.message",
        "components.title",
        "components.translation-with-arguments.message",
        "components.translation-with-arguments.title",
        "routes.index.key-to-overwrite",
        /^components\.translation-with-arguments\./
      ]
    }
  }
};
