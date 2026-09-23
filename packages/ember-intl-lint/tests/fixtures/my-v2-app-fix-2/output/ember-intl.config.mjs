export default {
  "lintRules": {
    "no-inconsistent-messages": {
      "ignores": [
        "components.translation-with-arguments.message",
        {},
        {},
        {},
        {}
      ]
    },
    "no-missing-keys": {
      "ignores": [
        "components.title",
        "routes.index.description",
        "routes.index.key-to-overwrite",
        {}
      ]
    },
    "no-unused-keys": {
      "ignores": [
        "components.component-from-app.message",
        "components.title",
        "components.translation-with-arguments.message",
        "components.translation-with-arguments.title",
        "routes.index.key-to-overwrite",
        {}
      ]
    }
  }
};
