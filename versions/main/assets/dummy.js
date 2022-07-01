'use strict';



;define("dummy/adapters/-addon-docs", ["exports", "ember-cli-addon-docs/adapters/-addon-docs"], function (_exports, _addonDocs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _addonDocs.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/adapters/-addon-docs"eaimeta@70e063a35619d71f
});
;define("dummy/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/adapter/json-api"eaimeta@70e063a35619d71f
});
;define("dummy/adapters/class", ["exports", "ember-cli-addon-docs/adapters/class"], function (_exports, _class) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _class.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/adapters/class"eaimeta@70e063a35619d71f
});
;define("dummy/adapters/component", ["exports", "ember-cli-addon-docs/adapters/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/adapters/component"eaimeta@70e063a35619d71f
});
;define("dummy/adapters/module", ["exports", "ember-cli-addon-docs/adapters/module"], function (_exports, _module) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _module.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/adapters/module"eaimeta@70e063a35619d71f
});
;define("dummy/adapters/project", ["exports", "ember-cli-addon-docs/adapters/project"], function (_exports, _project) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _project.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/adapters/project"eaimeta@70e063a35619d71f
});
;define("dummy/app", ["exports", "@ember/application", "dummy/config/environment", "ember-load-initializers", "ember-resolver"], function (_exports, _application, _environment, _emberLoadInitializers, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"dummy/config/environment",0,"ember-load-initializers",0,"ember-resolver"eaimeta@70e063a35619d71f

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends _application.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("dummy/breakpoints", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f

  var _default = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 991px)',
    desktop: '(min-width: 992px) and (max-width: 1200px)',
    jumbo: '(min-width: 1201px)'
  };
  _exports.default = _default;
});
;define("dummy/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component/-private/ember-component-manager"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-class", ["exports", "ember-cli-addon-docs/components/api/x-class"], function (_exports, _xClass) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xClass.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-class"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-component", ["exports", "ember-cli-addon-docs/components/api/x-component"], function (_exports, _xComponent) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xComponent.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-component"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-import-path", ["exports", "ember-cli-addon-docs/components/api/x-import-path"], function (_exports, _xImportPath) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xImportPath.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-import-path"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-meta-panel", ["exports", "ember-cli-addon-docs/components/api/x-meta-panel"], function (_exports, _xMetaPanel) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xMetaPanel.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-meta-panel"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-meta-panel/header", ["exports", "ember-cli-addon-docs/components/api/x-meta-panel/header"], function (_exports, _header) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-meta-panel/header"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-module", ["exports", "ember-cli-addon-docs/components/api/x-module"], function (_exports, _xModule) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xModule.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-module"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-section", ["exports", "ember-cli-addon-docs/components/api/x-section"], function (_exports, _xSection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xSection.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-section"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-sections", ["exports", "ember-cli-addon-docs/components/api/x-sections"], function (_exports, _xSections) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xSections.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-sections"eaimeta@70e063a35619d71f
});
;define("dummy/components/api/x-toggles", ["exports", "ember-cli-addon-docs/components/api/x-toggles"], function (_exports, _xToggles) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xToggles.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/api/x-toggles"eaimeta@70e063a35619d71f
});
;define("dummy/components/copy-button", ["exports", "ember-cli-clipboard/components/copy-button"], function (_exports, _copyButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _copyButton.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-clipboard/components/copy-button"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-code-highlight", ["exports", "ember-cli-addon-docs/components/docs-code-highlight"], function (_exports, _docsCodeHighlight) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsCodeHighlight.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-code-highlight"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-demo", ["exports", "ember-cli-addon-docs/components/docs-demo"], function (_exports, _docsDemo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsDemo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-demo"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-demo/x-example", ["exports", "ember-cli-addon-docs/components/docs-demo/x-example"], function (_exports, _xExample) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xExample.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-demo/x-example"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-demo/x-snippet", ["exports", "ember-cli-addon-docs/components/docs-demo/x-snippet"], function (_exports, _xSnippet) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xSnippet.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-demo/x-snippet"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-header", ["exports", "ember-cli-addon-docs/components/docs-header"], function (_exports, _docsHeader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsHeader.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-header"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-header/link", ["exports", "ember-cli-addon-docs/components/docs-header/link"], function (_exports, _link) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _link.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-header/link"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-header/search-box", ["exports", "ember-cli-addon-docs/components/docs-header/search-box"], function (_exports, _searchBox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _searchBox.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-header/search-box"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-header/search-result", ["exports", "ember-cli-addon-docs/components/docs-header/search-result"], function (_exports, _searchResult) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _searchResult.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-header/search-result"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-header/search-results", ["exports", "ember-cli-addon-docs/components/docs-header/search-results"], function (_exports, _searchResults) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _searchResults.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-header/search-results"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-header/version-selector", ["exports", "ember-cli-addon-docs/components/docs-header/version-selector"], function (_exports, _versionSelector) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _versionSelector.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-header/version-selector"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-hero", ["exports", "ember-cli-addon-docs/components/docs-hero"], function (_exports, _docsHero) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsHero.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-hero"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-keyboard-shortcuts", ["exports", "ember-cli-addon-docs/components/docs-keyboard-shortcuts"], function (_exports, _docsKeyboardShortcuts) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsKeyboardShortcuts.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-keyboard-shortcuts"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-link", ["exports", "ember-cli-addon-docs/components/docs-link"], function (_exports, _docsLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsLink.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-link"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-logo", ["exports", "ember-cli-addon-docs/components/docs-logo"], function (_exports, _docsLogo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsLogo.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-logo"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-snippet", ["exports", "ember-cli-addon-docs/components/docs-snippet"], function (_exports, _docsSnippet) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsSnippet.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-snippet"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer", ["exports", "ember-cli-addon-docs/components/docs-viewer"], function (_exports, _docsViewer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsViewer.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer/x-autogenerated-api-docs", ["exports", "ember-cli-addon-docs/components/docs-viewer/x-autogenerated-api-docs"], function (_exports, _xAutogeneratedApiDocs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xAutogeneratedApiDocs.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer/x-autogenerated-api-docs"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer/x-autogenerated-api-docs/module-nav", ["exports", "ember-cli-addon-docs/components/docs-viewer/x-autogenerated-api-docs/module-nav"], function (_exports, _moduleNav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _moduleNav.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer/x-autogenerated-api-docs/module-nav"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer/x-current-page-index", ["exports", "ember-cli-addon-docs/components/docs-viewer/x-current-page-index"], function (_exports, _xCurrentPageIndex) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xCurrentPageIndex.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer/x-current-page-index"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer/x-main", ["exports", "ember-cli-addon-docs/components/docs-viewer/x-main"], function (_exports, _xMain) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xMain.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer/x-main"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer/x-nav-item", ["exports", "ember-cli-addon-docs/components/docs-viewer/x-nav-item"], function (_exports, _xNavItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xNavItem.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer/x-nav-item"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer/x-nav-list", ["exports", "ember-cli-addon-docs/components/docs-viewer/x-nav-list"], function (_exports, _xNavList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xNavList.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer/x-nav-list"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer/x-nav", ["exports", "ember-cli-addon-docs/components/docs-viewer/x-nav"], function (_exports, _xNav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xNav.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer/x-nav"eaimeta@70e063a35619d71f
});
;define("dummy/components/docs-viewer/x-section", ["exports", "ember-cli-addon-docs/components/docs-viewer/x-section"], function (_exports, _xSection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xSection.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/docs-viewer/x-section"eaimeta@70e063a35619d71f
});
;define("dummy/components/ember-modal-dialog-positioned-container", ["exports", "ember-modal-dialog/components/positioned-container"], function (_exports, _positionedContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _positionedContainer.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-modal-dialog/components/positioned-container"eaimeta@70e063a35619d71f
});
;define("dummy/components/ember-modal-dialog/-basic-dialog", ["exports", "ember-modal-dialog/components/basic-dialog"], function (_exports, _basicDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _basicDialog.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-modal-dialog/components/basic-dialog"eaimeta@70e063a35619d71f
});
;define("dummy/components/ember-modal-dialog/-in-place-dialog", ["exports", "ember-modal-dialog/components/in-place-dialog"], function (_exports, _inPlaceDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inPlaceDialog.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-modal-dialog/components/in-place-dialog"eaimeta@70e063a35619d71f
});
;define("dummy/components/ember-modal-dialog/-liquid-dialog", ["exports", "ember-modal-dialog/components/liquid-dialog"], function (_exports, _liquidDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidDialog.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-modal-dialog/components/liquid-dialog"eaimeta@70e063a35619d71f
});
;define("dummy/components/ember-modal-dialog/-liquid-tether-dialog", ["exports", "ember-modal-dialog/components/liquid-tether-dialog"], function (_exports, _liquidTetherDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidTetherDialog.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-modal-dialog/components/liquid-tether-dialog"eaimeta@70e063a35619d71f
});
;define("dummy/components/ember-modal-dialog/-tether-dialog", ["exports", "ember-modal-dialog/components/tether-dialog"], function (_exports, _tetherDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _tetherDialog.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-modal-dialog/components/tether-dialog"eaimeta@70e063a35619d71f
});
;define("dummy/components/ember-tether", ["exports", "ember-tether/components/ember-tether"], function (_exports, _emberTether) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberTether.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-tether/components/ember-tether"eaimeta@70e063a35619d71f
});
;define("dummy/components/ember-wormhole", ["exports", "ember-wormhole/components/ember-wormhole"], function (_exports, _emberWormhole) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-wormhole/components/ember-wormhole"eaimeta@70e063a35619d71f
});
;define("dummy/components/locale-switcher", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/service", "@glimmer/component"], function (_exports, _component, _templateFactory, _object, _service, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/service",0,"@glimmer/component"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ul class="locale-switcher container" role="toolbar">
    <li class="list-item">
      <button
        aria-posinset="1"
        aria-setsize="4"
        class="button"
        type="button"
        {{on "click" (fn this.updateLocale "en-us")}}
      >
        en-us
      </button>
    </li>
  
    <li class="list-item">
      <button
        aria-posinset="2"
        aria-setsize="4"
        class="button"
        type="button"
        {{on "click" (fn this.updateLocale "de-de")}}
      >
        de-de
      </button>
    </li>
  
    <li class="list-item">
      <button
        aria-posinset="3"
        aria-setsize="4"
        class="button"
        type="button"
        {{on "click" (fn this.updateLocale "es-es")}}
      >
        es-es
      </button>
    </li>
  
    <li class="list-item">
      <button
        aria-posinset="4"
        aria-setsize="4"
        class="button"
        type="button"
        {{on "click" (fn this.updateLocale "fr-fr")}}
      >
        fr-fr
      </button>
    </li>
  </ul>
  */
  {
    "id": "CbaFJ8Su",
    "block": "[[[10,\"ul\"],[14,0,\"locale-switcher container\"],[14,\"role\",\"toolbar\"],[12],[1,\"\\n  \"],[10,\"li\"],[14,0,\"list-item\"],[12],[1,\"\\n    \"],[11,\"button\"],[24,\"aria-posinset\",\"1\"],[24,\"aria-setsize\",\"4\"],[24,0,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[28,[37,1],[[30,0,[\"updateLocale\"]],\"en-us\"],null]],null],[12],[1,\"\\n      en-us\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"li\"],[14,0,\"list-item\"],[12],[1,\"\\n    \"],[11,\"button\"],[24,\"aria-posinset\",\"2\"],[24,\"aria-setsize\",\"4\"],[24,0,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[28,[37,1],[[30,0,[\"updateLocale\"]],\"de-de\"],null]],null],[12],[1,\"\\n      de-de\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"li\"],[14,0,\"list-item\"],[12],[1,\"\\n    \"],[11,\"button\"],[24,\"aria-posinset\",\"3\"],[24,\"aria-setsize\",\"4\"],[24,0,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[28,[37,1],[[30,0,[\"updateLocale\"]],\"es-es\"],null]],null],[12],[1,\"\\n      es-es\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"li\"],[14,0,\"list-item\"],[12],[1,\"\\n    \"],[11,\"button\"],[24,\"aria-posinset\",\"4\"],[24,\"aria-setsize\",\"4\"],[24,0,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[28,[37,1],[[30,0,[\"updateLocale\"]],\"fr-fr\"],null]],null],[12],[1,\"\\n      fr-fr\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"on\",\"fn\"]]",
    "moduleName": "dummy/components/locale-switcher.hbs",
    "isStrictMode": false
  });

  let LocaleSwitcherComponent = (_class = class LocaleSwitcherComponent extends _component2.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "intl", _descriptor, this);
    }

    updateLocale(locale) {
      this.intl.setLocale(locale);
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "intl", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "updateLocale", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "updateLocale"), _class.prototype)), _class);
  _exports.default = LocaleSwitcherComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, LocaleSwitcherComponent);
});
;define("dummy/components/modal-dialog", ["exports", "ember-cli-addon-docs/components/modal-dialog"], function (_exports, _modalDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _modalDialog.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/components/modal-dialog"eaimeta@70e063a35619d71f
});
;define("dummy/controllers/docs/helpers/format-date", ["exports", "@ember/controller"], function (_exports, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller"eaimeta@70e063a35619d71f

  class DocsHelpersFormatDateController extends _controller.default {
    get today() {
      return new Date();
    }

    get yesterday() {
      const today = new Date();
      const yesterday = today.setDate(today.getDate() - 1);
      return yesterday;
    }

  }

  _exports.default = DocsHelpersFormatDateController;
});
;define("dummy/controllers/docs/helpers/format-list", ["exports", "@ember/controller"], function (_exports, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller"eaimeta@70e063a35619d71f

  class DocsHelpersFormatListController extends _controller.default {
    get fruits() {
      return ['apples', 'bananas', 'oranges'];
    }

  }

  _exports.default = DocsHelpersFormatListController;
});
;define("dummy/controllers/docs/helpers/format-message", ["exports", "@ember/controller"], function (_exports, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller"eaimeta@70e063a35619d71f

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class DocsHelpersFormatMessageController extends _controller.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "customMessage", '{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}.');
    }

    get today() {
      return new Date();
    }

    get yesterday() {
      const today = new Date();
      const yesterday = today.setDate(today.getDate() - 1);
      return yesterday;
    }

  }

  _exports.default = DocsHelpersFormatMessageController;
});
;define("dummy/controllers/docs/helpers/format-time", ["exports", "@ember/controller"], function (_exports, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller"eaimeta@70e063a35619d71f

  class DocsHelpersFormatTimeController extends _controller.default {
    get today() {
      return new Date();
    }

  }

  _exports.default = DocsHelpersFormatTimeController;
});
;define("dummy/controllers/docs/helpers/t", ["exports", "@ember/controller", "@ember/object", "@glimmer/tracking"], function (_exports, _controller, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@glimmer/tracking"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let DocsHelpersTController = (_class = class DocsHelpersTController extends _controller.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "numPhotos", _descriptor, this);
    }

    addPhoto() {
      this.numPhotos++;
    }

    deletePhoto() {
      if (this.numPhotos === 0) {
        return;
      }

      this.numPhotos--;
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "numPhotos", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "addPhoto", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addPhoto"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deletePhoto", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "deletePhoto"), _class.prototype)), _class);
  _exports.default = DocsHelpersTController;
});
;define("dummy/controllers/smoke", ["exports", "@ember/controller", "@ember/service"], function (_exports, _controller, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/service"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let SmokeController = (_class = class SmokeController extends _controller.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "intl", _descriptor, this);
    }

    get areNestedTranslationsWorking() {
      return this.intl.exists('smoke.parent.child');
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "intl", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = SmokeController;
});
;define("dummy/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug"eaimeta@70e063a35619d71f
});
;define("dummy/formats", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f

  const hhmmss = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const formats = {
    date: {
      hhmmss: hhmmss
    },
    time: {
      hhmmss: hhmmss
    },
    number: {
      compact: {
        notation: 'compact'
      },
      EUR: {
        style: 'currency',
        currency: 'EUR'
      },
      USD: {
        style: 'currency',
        currency: 'USD'
      },
      JPY: {
        style: 'currency',
        currency: 'JPY'
      },
      currency: {
        style: 'currency',
        minimumFractionDigits: 2
      }
    }
  };
  var _default = formats;
  _exports.default = _default;
});
;define("dummy/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "and", {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/and"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/append", ["exports", "ember-composable-helpers/helpers/append"], function (_exports, _append) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "append", {
    enumerable: true,
    get: function () {
      return _append.append;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _append.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/append"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/break-on", ["exports", "ember-cli-addon-docs/helpers/break-on"], function (_exports, _breakOn) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _breakOn.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/helpers/break-on"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/call", ["exports", "ember-composable-helpers/helpers/call"], function (_exports, _call) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "call", {
    enumerable: true,
    get: function () {
      return _call.call;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _call.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/call"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/camelize", ["exports", "ember-cli-string-helpers/helpers/camelize"], function (_exports, _camelize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "camelize", {
    enumerable: true,
    get: function () {
      return _camelize.camelize;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _camelize.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/camelize"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/cancel-all"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/capitalize", ["exports", "ember-cli-string-helpers/helpers/capitalize"], function (_exports, _capitalize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "capitalize", {
    enumerable: true,
    get: function () {
      return _capitalize.capitalize;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _capitalize.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/capitalize"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/chunk", ["exports", "ember-composable-helpers/helpers/chunk"], function (_exports, _chunk) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "chunk", {
    enumerable: true,
    get: function () {
      return _chunk.chunk;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _chunk.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/chunk"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/classify", ["exports", "ember-cli-string-helpers/helpers/classify"], function (_exports, _classify) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "classify", {
    enumerable: true,
    get: function () {
      return _classify.classify;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _classify.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/classify"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/compact", ["exports", "ember-composable-helpers/helpers/compact"], function (_exports, _compact) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _compact.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/compact"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/compute", ["exports", "ember-composable-helpers/helpers/compute"], function (_exports, _compute) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "compute", {
    enumerable: true,
    get: function () {
      return _compute.compute;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _compute.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/compute"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/dasherize", ["exports", "ember-cli-string-helpers/helpers/dasherize"], function (_exports, _dasherize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "dasherize", {
    enumerable: true,
    get: function () {
      return _dasherize.dasherize;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dasherize.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/dasherize"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/dec", ["exports", "ember-composable-helpers/helpers/dec"], function (_exports, _dec) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "dec", {
    enumerable: true,
    get: function () {
      return _dec.dec;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dec.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/dec"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/drop", ["exports", "ember-composable-helpers/helpers/drop"], function (_exports, _drop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _drop.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/drop"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/ensure-safe-component", ["exports", "@embroider/util"], function (_exports, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _util.EnsureSafeComponentHelper;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@embroider/util"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/entries", ["exports", "ember-composable-helpers/helpers/entries"], function (_exports, _entries) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _entries.default;
    }
  });
  Object.defineProperty(_exports, "entries", {
    enumerable: true,
    get: function () {
      return _entries.entries;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/entries"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/eq", ["exports", "ember-truth-helpers/helpers/equal"], function (_exports, _equal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(_exports, "equal", {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/equal"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/filter-by", ["exports", "ember-composable-helpers/helpers/filter-by"], function (_exports, _filterBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _filterBy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/filter-by"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/filter", ["exports", "ember-composable-helpers/helpers/filter"], function (_exports, _filter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _filter.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/filter"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/find-by", ["exports", "ember-composable-helpers/helpers/find-by"], function (_exports, _findBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _findBy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/find-by"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/flatten", ["exports", "ember-composable-helpers/helpers/flatten"], function (_exports, _flatten) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _flatten.default;
    }
  });
  Object.defineProperty(_exports, "flatten", {
    enumerable: true,
    get: function () {
      return _flatten.flatten;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/flatten"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/format-date", ["exports", "ember-intl/helpers/format-date"], function (_exports, _formatDate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatDate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-date"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/format-list", ["exports", "ember-intl/helpers/format-list"], function (_exports, _formatList) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatList.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-list"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/format-message", ["exports", "ember-intl/helpers/format-message"], function (_exports, _formatMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatMessage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-message"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/format-number", ["exports", "ember-intl/helpers/format-number"], function (_exports, _formatNumber) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatNumber.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-number"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/format-relative", ["exports", "ember-intl/helpers/format-relative"], function (_exports, _formatRelative) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatRelative.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-relative"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/format-time", ["exports", "ember-intl/helpers/format-time"], function (_exports, _formatTime) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _formatTime.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/format-time"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/from-entries", ["exports", "ember-composable-helpers/helpers/from-entries"], function (_exports, _fromEntries) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _fromEntries.default;
    }
  });
  Object.defineProperty(_exports, "fromEntries", {
    enumerable: true,
    get: function () {
      return _fromEntries.fromEntries;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/from-entries"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/get-code-snippet", ["exports", "ember-code-snippet/helpers/get-code-snippet"], function (_exports, _getCodeSnippet) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _getCodeSnippet.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-code-snippet/helpers/get-code-snippet"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/group-by", ["exports", "ember-composable-helpers/helpers/group-by"], function (_exports, _groupBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _groupBy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/group-by"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(_exports, "gt", {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/gt"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(_exports, "gte", {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/gte"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/has-next", ["exports", "ember-composable-helpers/helpers/has-next"], function (_exports, _hasNext) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _hasNext.default;
    }
  });
  Object.defineProperty(_exports, "hasNext", {
    enumerable: true,
    get: function () {
      return _hasNext.hasNext;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/has-next"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/has-previous", ["exports", "ember-composable-helpers/helpers/has-previous"], function (_exports, _hasPrevious) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _hasPrevious.default;
    }
  });
  Object.defineProperty(_exports, "hasPrevious", {
    enumerable: true,
    get: function () {
      return _hasPrevious.hasPrevious;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/has-previous"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/html-safe", ["exports", "ember-cli-string-helpers/helpers/html-safe"], function (_exports, _htmlSafe) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _htmlSafe.default;
    }
  });
  Object.defineProperty(_exports, "htmlSafe", {
    enumerable: true,
    get: function () {
      return _htmlSafe.htmlSafe;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/html-safe"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/humanize", ["exports", "ember-cli-string-helpers/helpers/humanize"], function (_exports, _humanize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _humanize.default;
    }
  });
  Object.defineProperty(_exports, "humanize", {
    enumerable: true,
    get: function () {
      return _humanize.humanize;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/humanize"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/if-key", ["exports", "ember-keyboard/helpers/if-key.js"], function (_exports, _ifKey) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ifKey.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-keyboard/helpers/if-key.js"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/ignore-children", ["exports", "ember-modal-dialog/helpers/ignore-children"], function (_exports, _ignoreChildren) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ignoreChildren.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-modal-dialog/helpers/ignore-children"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/inc", ["exports", "ember-composable-helpers/helpers/inc"], function (_exports, _inc) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inc.default;
    }
  });
  Object.defineProperty(_exports, "inc", {
    enumerable: true,
    get: function () {
      return _inc.inc;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/inc"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/includes", ["exports", "ember-composable-helpers/helpers/includes"], function (_exports, _includes) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _includes.default;
    }
  });
  Object.defineProperty(_exports, "includes", {
    enumerable: true,
    get: function () {
      return _includes.includes;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/includes"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/intersect", ["exports", "ember-composable-helpers/helpers/intersect"], function (_exports, _intersect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _intersect.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/intersect"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/invoke", ["exports", "ember-composable-helpers/helpers/invoke"], function (_exports, _invoke) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _invoke.default;
    }
  });
  Object.defineProperty(_exports, "invoke", {
    enumerable: true,
    get: function () {
      return _invoke.invoke;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/invoke"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-array"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/is-clipboard-supported", ["exports", "ember-cli-clipboard/helpers/is-clipboard-supported"], function (_exports, _isClipboardSupported) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isClipboardSupported.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-clipboard/helpers/is-clipboard-supported"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-empty"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(_exports, "isEqual", {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/is-equal"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/join", ["exports", "ember-composable-helpers/helpers/join"], function (_exports, _join) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _join.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/join"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/keys", ["exports", "ember-composable-helpers/helpers/keys"], function (_exports, _keys) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _keys.default;
    }
  });
  Object.defineProperty(_exports, "keys", {
    enumerable: true,
    get: function () {
      return _keys.keys;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/keys"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/lowercase", ["exports", "ember-cli-string-helpers/helpers/lowercase"], function (_exports, _lowercase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lowercase.default;
    }
  });
  Object.defineProperty(_exports, "lowercase", {
    enumerable: true,
    get: function () {
      return _lowercase.lowercase;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/lowercase"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(_exports, "lt", {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/lt"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(_exports, "lte", {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/lte"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/map-by", ["exports", "ember-composable-helpers/helpers/map-by"], function (_exports, _mapBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mapBy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/map-by"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/map", ["exports", "ember-composable-helpers/helpers/map"], function (_exports, _map) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _map.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/map"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/media", ["exports", "ember-responsive/helpers/media"], function (_exports, _media) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _media.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-responsive/helpers/media"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/next", ["exports", "ember-composable-helpers/helpers/next"], function (_exports, _next) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _next.default;
    }
  });
  Object.defineProperty(_exports, "next", {
    enumerable: true,
    get: function () {
      return _next.next;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/next"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/noop", ["exports", "ember-composable-helpers/helpers/noop"], function (_exports, _noop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _noop.default;
    }
  });
  Object.defineProperty(_exports, "noop", {
    enumerable: true,
    get: function () {
      return _noop.noop;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/noop"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-equal"], function (_exports, _notEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(_exports, "notEqualHelper", {
    enumerable: true,
    get: function () {
      return _notEqual.notEqualHelper;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/not-equal"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(_exports, "not", {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/not"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/object-at", ["exports", "ember-composable-helpers/helpers/object-at"], function (_exports, _objectAt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _objectAt.default;
    }
  });
  Object.defineProperty(_exports, "objectAt", {
    enumerable: true,
    get: function () {
      return _objectAt.objectAt;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/object-at"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/on-key", ["exports", "ember-keyboard/helpers/on-key.js"], function (_exports, _onKey) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _onKey.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-keyboard/helpers/on-key.js"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/optional", ["exports", "ember-composable-helpers/helpers/optional"], function (_exports, _optional) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _optional.default;
    }
  });
  Object.defineProperty(_exports, "optional", {
    enumerable: true,
    get: function () {
      return _optional.optional;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/optional"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(_exports, "or", {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/or"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/perform"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/pick", ["exports", "ember-composable-helpers/helpers/pick"], function (_exports, _pick) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pick.default;
    }
  });
  Object.defineProperty(_exports, "pick", {
    enumerable: true,
    get: function () {
      return _pick.pick;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/pick"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/pipe-action", ["exports", "ember-composable-helpers/helpers/pipe-action"], function (_exports, _pipeAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pipeAction.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/pipe-action"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/pipe", ["exports", "ember-composable-helpers/helpers/pipe"], function (_exports, _pipe) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pipe.default;
    }
  });
  Object.defineProperty(_exports, "pipe", {
    enumerable: true,
    get: function () {
      return _pipe.pipe;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/pipe"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-inflector/lib/helpers/pluralize"eaimeta@70e063a35619d71f

  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("dummy/helpers/previous", ["exports", "ember-composable-helpers/helpers/previous"], function (_exports, _previous) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _previous.default;
    }
  });
  Object.defineProperty(_exports, "previous", {
    enumerable: true,
    get: function () {
      return _previous.previous;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/previous"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/queue", ["exports", "ember-composable-helpers/helpers/queue"], function (_exports, _queue) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _queue.default;
    }
  });
  Object.defineProperty(_exports, "queue", {
    enumerable: true,
    get: function () {
      return _queue.queue;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/queue"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/range", ["exports", "ember-composable-helpers/helpers/range"], function (_exports, _range) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _range.default;
    }
  });
  Object.defineProperty(_exports, "range", {
    enumerable: true,
    get: function () {
      return _range.range;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/range"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/reduce", ["exports", "ember-composable-helpers/helpers/reduce"], function (_exports, _reduce) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _reduce.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/reduce"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/reject-by", ["exports", "ember-composable-helpers/helpers/reject-by"], function (_exports, _rejectBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rejectBy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/reject-by"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/repeat", ["exports", "ember-composable-helpers/helpers/repeat"], function (_exports, _repeat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _repeat.default;
    }
  });
  Object.defineProperty(_exports, "repeat", {
    enumerable: true,
    get: function () {
      return _repeat.repeat;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/repeat"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/reverse", ["exports", "ember-composable-helpers/helpers/reverse"], function (_exports, _reverse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _reverse.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/reverse"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/root-url", ["exports", "ember-root-url/helpers/root-url"], function (_exports, _rootUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rootUrl.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-root-url/helpers/root-url"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/route-idle", ["exports", "ember-app-scheduler/helpers/route-idle"], function (_exports, _routeIdle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _routeIdle.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-app-scheduler/helpers/route-idle"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/set", ["exports", "ember-set-helper/helpers/set"], function (_exports, _set) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _set.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-set-helper/helpers/set"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/shuffle", ["exports", "ember-composable-helpers/helpers/shuffle"], function (_exports, _shuffle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _shuffle.default;
    }
  });
  Object.defineProperty(_exports, "shuffle", {
    enumerable: true,
    get: function () {
      return _shuffle.shuffle;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/shuffle"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-inflector/lib/helpers/singularize"eaimeta@70e063a35619d71f

  var _default = _singularize.default;
  _exports.default = _default;
});
;define("dummy/helpers/slice", ["exports", "ember-composable-helpers/helpers/slice"], function (_exports, _slice) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _slice.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/slice"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/sort-by", ["exports", "ember-composable-helpers/helpers/sort-by"], function (_exports, _sortBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _sortBy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/sort-by"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/svg-jar", ["exports", "ember-svg-jar/utils/make-helper", "ember-svg-jar/utils/make-svg"], function (_exports, _makeHelper, _makeSvg) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.svgJar = svgJar;
  0; //eaimeta@70e063a35619d71f0,"ember-svg-jar/utils/make-helper",0,"ember-svg-jar/utils/make-svg"eaimeta@70e063a35619d71f

  function getInlineAsset(assetId) {
    try {
      /* eslint-disable global-require */
      return require(`ember-svg-jar/inlined/${assetId}`).default;
    } catch (err) {
      return null;
    }
  }

  function svgJar(assetId, svgAttrs) {
    return (0, _makeSvg.default)(assetId, svgAttrs, getInlineAsset);
  }

  var _default = (0, _makeHelper.default)(svgJar);

  _exports.default = _default;
});
;define("dummy/helpers/t", ["exports", "ember-intl/helpers/t"], function (_exports, _t) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _t.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/helpers/t"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/take", ["exports", "ember-composable-helpers/helpers/take"], function (_exports, _take) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _take.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/take"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-concurrency/helpers/task"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/titleize", ["exports", "ember-cli-string-helpers/helpers/titleize"], function (_exports, _titleize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _titleize.default;
    }
  });
  Object.defineProperty(_exports, "titleize", {
    enumerable: true,
    get: function () {
      return _titleize.titleize;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/titleize"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/toggle-action", ["exports", "ember-composable-helpers/helpers/toggle-action"], function (_exports, _toggleAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggleAction.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/toggle-action"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/toggle", ["exports", "ember-composable-helpers/helpers/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  Object.defineProperty(_exports, "toggle", {
    enumerable: true,
    get: function () {
      return _toggle.toggle;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/toggle"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/trim", ["exports", "ember-cli-string-helpers/helpers/trim"], function (_exports, _trim) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _trim.default;
    }
  });
  Object.defineProperty(_exports, "trim", {
    enumerable: true,
    get: function () {
      return _trim.trim;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/trim"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/truncate", ["exports", "ember-cli-string-helpers/helpers/truncate"], function (_exports, _truncate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _truncate.default;
    }
  });
  Object.defineProperty(_exports, "truncate", {
    enumerable: true,
    get: function () {
      return _truncate.truncate;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/truncate"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/type-signature", ["exports", "ember-cli-addon-docs/helpers/type-signature"], function (_exports, _typeSignature) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _typeSignature.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/helpers/type-signature"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/underscore", ["exports", "ember-cli-string-helpers/helpers/underscore"], function (_exports, _underscore) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _underscore.default;
    }
  });
  Object.defineProperty(_exports, "underscore", {
    enumerable: true,
    get: function () {
      return _underscore.underscore;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/underscore"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/union", ["exports", "ember-composable-helpers/helpers/union"], function (_exports, _union) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _union.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/union"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/uppercase", ["exports", "ember-cli-string-helpers/helpers/uppercase"], function (_exports, _uppercase) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _uppercase.default;
    }
  });
  Object.defineProperty(_exports, "uppercase", {
    enumerable: true,
    get: function () {
      return _uppercase.uppercase;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/uppercase"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/values", ["exports", "ember-composable-helpers/helpers/values"], function (_exports, _values) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _values.default;
    }
  });
  Object.defineProperty(_exports, "values", {
    enumerable: true,
    get: function () {
      return _values.values;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/values"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/w", ["exports", "ember-cli-string-helpers/helpers/w"], function (_exports, _w) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _w.default;
    }
  });
  Object.defineProperty(_exports, "w", {
    enumerable: true,
    get: function () {
      return _w.w;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/helpers/w"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/without", ["exports", "ember-composable-helpers/helpers/without"], function (_exports, _without) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _without.default;
    }
  });
  Object.defineProperty(_exports, "without", {
    enumerable: true,
    get: function () {
      return _without.without;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-composable-helpers/helpers/without"eaimeta@70e063a35619d71f
});
;define("dummy/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(_exports, "xor", {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-truth-helpers/helpers/xor"eaimeta@70e063a35619d71f
});
;define("dummy/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-resolver/resolvers/classic/container-debug-adapter"eaimeta@70e063a35619d71f

  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
    }

  };
  _exports.default = _default;
});
;define("dummy/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/debug/setup"eaimeta@70e063a35619d71f
});
;define("dummy/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-data",0,"ember-data/setup-container"eaimeta@70e063a35619d71f

  /*
    This code initializes EmberData in an Ember application.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("dummy/initializers/ember-responsive-breakpoints", ["exports", "ember-responsive/initializers/responsive"], function (_exports, _responsive) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-responsive/initializers/responsive"eaimeta@70e063a35619d71f

  var _default = _responsive.default;
  _exports.default = _default;
});
;define("dummy/initializers/export-application-global", ["exports", "ember", "dummy/config/environment"], function (_exports, _ember, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;
  0; //eaimeta@70e063a35619d71f0,"ember",0,"dummy/config/environment"eaimeta@70e063a35619d71f

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("dummy/initializers/route-anchor-jump", ["exports", "ember-cli-addon-docs/initializers/route-anchor-jump"], function (_exports, _routeAnchorJump) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _routeAnchorJump.default;
    }
  });
  Object.defineProperty(_exports, "initialize", {
    enumerable: true,
    get: function () {
      return _routeAnchorJump.initialize;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/initializers/route-anchor-jump"eaimeta@70e063a35619d71f
});
;define("dummy/instance-initializers/add-modals-container", ["exports", "dummy/config/environment", "ember-modal-dialog/instance-initializers/add-modals-container"], function (_exports, _environment, _addModalsContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"dummy/config/environment",0,"ember-modal-dialog/instance-initializers/add-modals-container"eaimeta@70e063a35619d71f

  var _default = {
    name: 'add-modals-container',

    initialize(appInstance) {
      if (_environment.default.environment === 'test') {
        return;
      }

      return (0, _addModalsContainer.default)(appInstance);
    }

  };
  _exports.default = _default;
});
;define("dummy/instance-initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f

  /* exists only for things that historically used "after" or "before" */
  var _default = {
    name: 'ember-data',

    initialize() {}

  };
  _exports.default = _default;
});
;define("dummy/instance-initializers/ember-router-scroll", ["exports", "ember-router-scroll/instance-initializers/ember-router-scroll"], function (_exports, _emberRouterScroll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberRouterScroll.default;
    }
  });
  Object.defineProperty(_exports, "initialize", {
    enumerable: true,
    get: function () {
      return _emberRouterScroll.initialize;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-router-scroll/instance-initializers/ember-router-scroll"eaimeta@70e063a35619d71f
});
;define("dummy/models/class", ["exports", "ember-cli-addon-docs/models/class"], function (_exports, _class) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _class.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/models/class"eaimeta@70e063a35619d71f
});
;define("dummy/models/component", ["exports", "ember-cli-addon-docs/models/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/models/component"eaimeta@70e063a35619d71f
});
;define("dummy/models/module", ["exports", "ember-cli-addon-docs/models/module"], function (_exports, _module) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _module.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/models/module"eaimeta@70e063a35619d71f
});
;define("dummy/models/project", ["exports", "ember-cli-addon-docs/models/project"], function (_exports, _project) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _project.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/models/project"eaimeta@70e063a35619d71f
});
;define("dummy/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-insert"eaimeta@70e063a35619d71f
});
;define("dummy/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/did-update"eaimeta@70e063a35619d71f
});
;define("dummy/modifiers/on-key", ["exports", "ember-keyboard/modifiers/on-key.js"], function (_exports, _onKey) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _onKey.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-keyboard/modifiers/on-key.js"eaimeta@70e063a35619d71f
});
;define("dummy/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember/render-modifiers/modifiers/will-destroy"eaimeta@70e063a35619d71f
});
;define("dummy/router", ["exports", "dummy/config/environment", "ember-cli-addon-docs/router"], function (_exports, _environment, _router) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"dummy/config/environment",0,"ember-cli-addon-docs/router"eaimeta@70e063a35619d71f

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends _router.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    (0, _router.docsRoute)(this, function () {
      this.route('advanced', function () {
        this.route('addon-support');
      });
      this.route('cookbook', function () {
        this.route('common-errors');
      });
      this.route('getting-started', {
        path: '/'
      }, function () {
        this.route('quickstart');
        this.route('runtime-requirements');
      });
      this.route('guide', function () {
        this.route('addon-configs');
        this.route('asynchronously-loading-translations');
        this.route('migration-4-0-to-5-0');
        this.route('missing-translations');
        this.route('service-api');
        this.route('testing');
        this.route('translating-text');
      });
      this.route('helpers', function () {
        this.route('format-date');
        this.route('format-list');
        this.route('format-message');
        this.route('format-number');
        this.route('format-relative');
        this.route('format-time');
        this.route('t');
      });
      this.route('integrations', function () {
        this.route('ember-cp-validations');
        this.route('visual-studio-code');
      });
      this.route('legacy', function () {
        this.route('migration-2-0-to-3-0');
        this.route('migration-3-0-to-4-0');
        this.route('v2');
      });
    });
    this.route('smoke');
    this.route('not-found', {
      path: '*'
    });
  });
});
;define("dummy/routes/application", ["exports", "@ember/routing/route", "@ember/service"], function (_exports, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let ApplicationRoute = (_class = class ApplicationRoute extends _route.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "intl", _descriptor, this);
    }

    beforeModel() {
      this.intl.setLocale(['en-us']);
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "intl", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = ApplicationRoute;
});
;define("dummy/routes/docs", ["exports", "ember-cli-addon-docs/routes/docs"], function (_exports, _docs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docs.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/routes/docs"eaimeta@70e063a35619d71f
});
;define("dummy/routes/docs/api/item", ["exports", "ember-cli-addon-docs/routes/docs/api/item"], function (_exports, _item) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/routes/docs/api/item"eaimeta@70e063a35619d71f
});
;define("dummy/serializers/-addon-docs", ["exports", "ember-cli-addon-docs/serializers/-addon-docs"], function (_exports, _addonDocs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _addonDocs.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/serializers/-addon-docs"eaimeta@70e063a35619d71f
});
;define("dummy/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/json"eaimeta@70e063a35619d71f
});
;define("dummy/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/json-api"eaimeta@70e063a35619d71f
});
;define("dummy/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/rest"eaimeta@70e063a35619d71f
});
;define("dummy/serializers/class", ["exports", "ember-cli-addon-docs/serializers/class"], function (_exports, _class) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _class.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/serializers/class"eaimeta@70e063a35619d71f
});
;define("dummy/serializers/component", ["exports", "ember-cli-addon-docs/serializers/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/serializers/component"eaimeta@70e063a35619d71f
});
;define("dummy/serializers/module", ["exports", "ember-cli-addon-docs/serializers/module"], function (_exports, _module) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _module.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/serializers/module"eaimeta@70e063a35619d71f
});
;define("dummy/serializers/project", ["exports", "ember-cli-addon-docs/serializers/project"], function (_exports, _project) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _project.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/serializers/project"eaimeta@70e063a35619d71f
});
;define("dummy/services/-ensure-registered", ["exports", "@embroider/util/services/ensure-registered"], function (_exports, _ensureRegistered) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ensureRegistered.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@embroider/util/services/ensure-registered"eaimeta@70e063a35619d71f
});
;define("dummy/services/docs-routes", ["exports", "ember-cli-addon-docs/services/docs-routes"], function (_exports, _docsRoutes) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsRoutes.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/services/docs-routes"eaimeta@70e063a35619d71f
});
;define("dummy/services/docs-search", ["exports", "ember-cli-addon-docs/services/docs-search"], function (_exports, _docsSearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _docsSearch.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/services/docs-search"eaimeta@70e063a35619d71f
});
;define("dummy/services/intl", ["exports", "ember-intl/services/intl"], function (_exports, _intl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _intl.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/services/intl"eaimeta@70e063a35619d71f
});
;define("dummy/services/keyboard", ["exports", "ember-keyboard/services/keyboard.js"], function (_exports, _keyboard) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _keyboard.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-keyboard/services/keyboard.js"eaimeta@70e063a35619d71f
});
;define("dummy/services/media", ["exports", "ember-responsive/services/media"], function (_exports, _media) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-responsive/services/media"eaimeta@70e063a35619d71f

  var _default = _media.default;
  _exports.default = _default;
});
;define("dummy/services/modal-dialog", ["exports", "@ember/object", "@ember/service", "dummy/config/environment", "ember-modal-dialog/utils/config-utils"], function (_exports, _object, _service, _environment, _configUtils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/service",0,"dummy/config/environment",0,"ember-modal-dialog/utils/config-utils"eaimeta@70e063a35619d71f

  function computedFromConfig(prop) {
    return (0, _object.computed)(function () {
      return _environment.default['ember-modal-dialog'] && _environment.default['ember-modal-dialog'][prop];
    });
  }

  var _default = _service.default.extend({
    hasEmberTether: computedFromConfig('hasEmberTether'),
    hasLiquidWormhole: computedFromConfig('hasLiquidWormhole'),
    hasLiquidTether: computedFromConfig('hasLiquidTether'),
    destinationElementId: (0, _object.computed)(function () {
      return (0, _configUtils.getDestinationElementIdFromConfig)(_environment.default);
    })
  });

  _exports.default = _default;
});
;define("dummy/services/project-version", ["exports", "ember-cli-addon-docs/services/project-version"], function (_exports, _projectVersion) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _projectVersion.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-addon-docs/services/project-version"eaimeta@70e063a35619d71f
});
;define("dummy/services/root-url", ["exports", "ember-root-url/services/root-url"], function (_exports, _rootUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rootUrl.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-root-url/services/root-url"eaimeta@70e063a35619d71f
});
;define("dummy/services/router-scroll", ["exports", "ember-router-scroll/services/router-scroll"], function (_exports, _routerScroll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _routerScroll.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-router-scroll/services/router-scroll"eaimeta@70e063a35619d71f
});
;define("dummy/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-data/store"eaimeta@70e063a35619d71f
});
;define("dummy/snippets/docs/helpers/format-date/example-1/component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component"eaimeta@70e063a35619d71f

  class MyComponent extends _component.default {
    get today() {
      return new Date();
    }

    get yesterday() {
      const today = new Date();
      const yesterday = today.setDate(today.getDate() - 1);
      return yesterday;
    }

  } // END-SNIPPET


  _exports.default = MyComponent;
});
;define("dummy/snippets/docs/helpers/format-date/example-1/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "089Y1/V4",
    "block": "[[[1,\"Today: \"],[1,[28,[35,0],[[30,0,[\"today\"]]],null]],[1,\"\\nYesterday: \"],[1,[28,[35,0],[[30,0,[\"yesterday\"]]],null]],[1,\"\\n\"]],[],false,[\"format-date\"]]",
    "moduleName": "dummy/snippets/docs/helpers/format-date/example-1/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/snippets/docs/helpers/format-date/example-2/component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component"eaimeta@70e063a35619d71f

  class MyComponent extends _component.default {
    get today() {
      return new Date();
    }

  } // END-SNIPPET


  _exports.default = MyComponent;
});
;define("dummy/snippets/docs/helpers/format-date/example-2/format", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f

  // BEGIN-SNIPPET docs__helpers__format-date__example-2__app__format.js
  var _default = {
    date: {
      hhmmss: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
    },
    number: {
      /* ... */
    },
    time: {
      /* ... */
    }
  }; // END-SNIPPET

  _exports.default = _default;
});
;define("dummy/snippets/docs/helpers/format-date/example-2/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "ji8XG6Ig",
    "block": "[[[1,\"Time: \"],[1,[28,[35,0],[[30,0,[\"today\"]]],[[\"format\"],[\"hhmmss\"]]]],[1,\"\\n\"]],[],false,[\"format-date\"]]",
    "moduleName": "dummy/snippets/docs/helpers/format-date/example-2/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/snippets/docs/helpers/format-list/example-1/component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component"eaimeta@70e063a35619d71f

  class MyComponent extends _component.default {
    get fruits() {
      return ['apples', 'bananas', 'oranges'];
    }

  } // END-SNIPPET


  _exports.default = MyComponent;
});
;define("dummy/snippets/docs/helpers/format-list/example-1/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "zSLqGfEA",
    "block": "[[[1,\"Conjunction: \"],[1,[28,[35,0],[[30,0,[\"fruits\"]]],[[\"type\"],[\"conjunction\"]]]],[1,\"\\nDisjunction: \"],[1,[28,[35,0],[[30,0,[\"fruits\"]]],[[\"type\"],[\"disjunction\"]]]],[1,\"\\n\"]],[],false,[\"format-list\"]]",
    "moduleName": "dummy/snippets/docs/helpers/format-list/example-1/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/snippets/docs/helpers/format-message/example-1/component", ["exports", "@glimmer/controller"], function (_exports, _controller) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/controller"eaimeta@70e063a35619d71f

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class DocsHelpersFormatMessageComponent extends _controller.default {
    constructor() {
      super(...arguments);

      _defineProperty(this, "customMessage", '{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}.');
    }

    get today() {
      return new Date();
    }

    get yesterday() {
      const today = new Date();
      const yesterday = today.setDate(today.getDate() - 1);
      return yesterday;
    }

  } // END-SNIPPET


  _exports.default = DocsHelpersFormatMessageComponent;
});
;define("dummy/snippets/docs/helpers/format-message/example-1/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "Xkq47rfb",
    "block": "[[[10,0],[12],[1,\"\\n  \"],[1,[28,[35,0],[[30,0,[\"customMessage\"]]],[[\"name\",\"numPhotos\",\"timestamp\"],[\"Sonja\",12,[30,0,[\"yesterday\"]]]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[12],[1,\"\\n  \"],[1,[28,[35,0],[[30,0,[\"customMessage\"]]],[[\"name\",\"numPhotos\",\"timestamp\"],[\"Chris\",0,[30,0,[\"yesterday\"]]]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[12],[1,\"\\n  \"],[1,[28,[35,0],[[30,0,[\"customMessage\"]]],[[\"name\",\"numPhotos\",\"timestamp\"],[\"Maki\",1,[30,0,[\"today\"]]]]]],[1,\"\\n\"],[13],[1,\"\\n\"]],[],false,[\"format-message\"]]",
    "moduleName": "dummy/snippets/docs/helpers/format-message/example-1/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/snippets/docs/helpers/format-number/example-1/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "ckgMCXSj",
    "block": "[[[1,\"As number: \"],[1,[28,[35,0],[1000],null]],[1,\"\\nAs currency: \"],[1,[28,[35,0],[1000],[[\"currency\",\"style\"],[\"USD\",\"currency\"]]]],[1,\"\\n\"]],[],false,[\"format-number\"]]",
    "moduleName": "dummy/snippets/docs/helpers/format-number/example-1/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/snippets/docs/helpers/format-relative/example-1/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "d8KOkbqJ",
    "block": "[[[1,\"Past: \"],[1,[28,[35,0],[-1],[[\"unit\"],[\"month\"]]]],[1,\"\\nCurrent: \"],[1,[28,[35,0],[0],[[\"unit\"],[\"day\"]]]],[1,\"\\nFuture: \"],[1,[28,[35,0],[3],[[\"unit\"],[\"week\"]]]],[1,\"\\n\"]],[],false,[\"format-relative\"]]",
    "moduleName": "dummy/snippets/docs/helpers/format-relative/example-1/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/snippets/docs/helpers/format-time/example-1/component", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@glimmer/component"eaimeta@70e063a35619d71f

  class MyComponent extends _component.default {
    get today() {
      return new Date();
    }

  } // END-SNIPPET


  _exports.default = MyComponent;
});
;define("dummy/snippets/docs/helpers/format-time/example-1/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "5UqderwS",
    "block": "[[[1,\"Time: \"],[1,[28,[35,0],[[30,0,[\"today\"]]],[[\"format\"],[\"hhmmss\"]]]],[1,\"\\n\"]],[],false,[\"format-time\"]]",
    "moduleName": "dummy/snippets/docs/helpers/format-time/example-1/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/snippets/docs/helpers/t/example-1/component", ["exports", "@ember/object", "@glimmer/component", "@glimmer/tracking"], function (_exports, _object, _component, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _class, _descriptor;

  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@glimmer/component",0,"@glimmer/tracking"eaimeta@70e063a35619d71f

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  let MyComponent = (_class = class MyComponent extends _component.default {
    constructor() {
      super(...arguments);

      _initializerDefineProperty(this, "numPhotos", _descriptor, this);
    }

    addPhoto() {
      this.numPhotos++;
    }

    deletePhoto() {
      if (this.numPhotos === 0) {
        return;
      }

      this.numPhotos--;
    }

  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "numPhotos", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 0;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "addPhoto", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "addPhoto"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deletePhoto", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "deletePhoto"), _class.prototype)), _class); // END-SNIPPET

  _exports.default = MyComponent;
});
;define("dummy/snippets/docs/helpers/t/example-1/template", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "21UMB7Qq",
    "block": "[[[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[30,0,[\"addPhoto\"]]],null],[12],[1,\"\\n  Add photo\\n\"],[13],[1,\"\\n\\n\"],[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[30,0,[\"deletePhoto\"]]],null],[12],[1,\"\\n  Delete photo\\n\"],[13],[1,\"\\n\\nMessage: \"],[1,[28,[35,1],[\"photos.banner\"],[[\"numPhotos\"],[[30,0,[\"numPhotos\"]]]]]],[1,\"\\n\"]],[],false,[\"on\",\"t\"]]",
    "moduleName": "dummy/snippets/docs/helpers/t/example-1/template.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "ECnmDI9Z",
    "block": "[[[8,[39,0],null,null,null],[1,\"\\n\\n\"],[46,[28,[37,2],null,null],null,null,null],[1,\"\\n\\n\"],[8,[39,3],null,null,null]],[],false,[\"docs-header\",\"component\",\"-outlet\",\"docs-keyboard-shortcuts\"]]",
    "moduleName": "dummy/templates/application.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "SBSLp9+I",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"nav\"]],null,null,[[\"default\"],[[[[1,\"\\n    \"],[8,[30,2,[\"section\"]],null,[[\"@label\"],[\"Getting Started\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Overview\",\"docs.getting-started.index\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Runtime requirements\",\"docs.getting-started.runtime-requirements\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Quickstart\",\"docs.getting-started.quickstart\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"section\"]],null,[[\"@label\"],[\"Guide\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Migration from 4.0 to 5.0\",\"docs.guide.migration-4-0-to-5-0\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Configuration\",\"docs.guide.addon-configs\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Translating text\",\"docs.guide.translating-text\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Service API\",\"docs.guide.service-api\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Lazy-loading translations\",\"docs.guide.asynchronously-loading-translations\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Missing translations\",\"docs.guide.missing-translations\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Testing\",\"docs.guide.testing\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"section\"]],null,[[\"@label\"],[\"Template helpers\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Introduction\",\"docs.helpers.index\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"The t helper\",\"docs.helpers.t\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"format-date\",\"docs.helpers.format-date\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"format-time\",\"docs.helpers.format-time\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"format-message\",\"docs.helpers.format-message\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"format-number\",\"docs.helpers.format-number\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"format-relative\",\"docs.helpers.format-relative\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"format-list\",\"docs.helpers.format-list\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"section\"]],null,[[\"@label\"],[\"Cookbook\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Common errors\",\"docs.cookbook.common-errors\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"section\"]],null,[[\"@label\"],[\"Advanced\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Addon support\",\"docs.advanced.addon-support\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"section\"]],null,[[\"@label\"],[\"Integrations\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"ember-cp-validations\",\"docs.integrations.ember-cp-validations\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Visual Studio Code\",\"docs.integrations.visual-studio-code\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"section\"]],null,[[\"@label\"],[\"Legacy\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Migration from 3.0 to 4.0\",\"docs.legacy.migration-3-0-to-4-0\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Migration from 2.0 to 3.0\",\"docs.legacy.migration-2-0-to-3-0\"]],null],[1,\"\\n\\n    \"],[8,[30,2,[\"item\"]],null,[[\"@label\",\"@route\"],[\"Documentation for 2.0\",\"docs.legacy.v2\"]],null],[1,\"\\n  \"]],[2]]]]],[1,\"\\n\\n  \"],[8,[30,1,[\"main\"]],null,null,[[\"default\"],[[[[1,\"\\n    \"],[46,[28,[37,2],null,null],null,null,null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[1]]]]]],[\"viewer\",\"nav\"],false,[\"docs-viewer\",\"component\",\"-outlet\"]]",
    "moduleName": "dummy/templates/docs.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/advanced/addon-support", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "0hDxm1Eq",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"addon-support\"],[14,0,\"docs-md__h1\"],[12],[1,\"Addon support\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"By default, addons are supported out of the box. They need to implement a \"],[10,\"code\"],[12],[1,\"/translations\"],[13],[1,\" folder at the root of your project (NOTE: a sibling to \"],[10,\"code\"],[12],[1,\"app\"],[13],[1,\" \"],[10,\"em\"],[12],[1,\"not\"],[13],[1,\" a child). Then, the contents of the translation folder will be bundled with the translations of your host app.\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"advanced-usage-treefortranslations-\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#advanced-usage-treefortranslations-\"],[14,0,\"heading-anchor\"],[12],[1,\"Advanced Usage (treeForTranslations)\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"In v3.0.0, a hook called \"],[10,\"code\"],[12],[1,\"treeForTranslations\"],[13],[1,\" was introduced to support addons better.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"The behavior is that every addon that implements a \"],[10,\"code\"],[12],[1,\"treeForTranslations\"],[13],[1,\" hook will be invoked at build time. If an addon does not implement a \"],[10,\"code\"],[12],[1,\"treeForTranslations\"],[13],[1,\" but instead has a \"],[10,\"code\"],[12],[1,\"/translations\"],[13],[1,\" folder then the contents of the folder will be used.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"An example use-case of this hook would be programmatically fetching translations at build time from a third-party service. If you create a broccoli plugin that you think will be useful for others, submit a PR to add to the documentation!\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// index.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"exports\"],[13],[1,\" = {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"name\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'an-ember-addon'\"],[13],[1,\",\\n\\n  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"/**\\n   * \"],[10,1],[14,0,\"hljs-doctag\"],[12],[1,\"NOTE:\"],[13],[1,\" addon's translation tree provided as an arg.\\n   * No need to return it if you are reimplementing behavior.\\n   * If you want to programmatically modify the translation node,\\n   * then feel free to mutate the passed in tree and return it.\\n   */\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"treeForTranslations\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"/* tree */\"],[13],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"new\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"BroccoliTranslationPlugin\"],[13],[1,\"();\\n  }\\n};\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"overriding-translations\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#overriding-translations\"],[14,0,\"heading-anchor\"],[12],[1,\"Overriding Translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The host application can always override addon translations. If the application implements a key that collides with an addon, then the application wins when bundling the translations. This is intended to allow host applications to override translations without having to modify an addon.\"],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/advanced/addon-support.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/api/item", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "xN7SjcMA",
    "block": "[[[41,[30,0,[\"model\",\"isComponent\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@component\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"model\",\"isClass\"]],[[[1,\"  \"],[8,[39,2],null,[[\"@class\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[8,[39,3],null,[[\"@module\"],[[30,0,[\"model\"]]]],null],[1,\"\\n\"]],[]]]],[]]]],[],false,[\"if\",\"api/x-component\",\"api/x-class\",\"api/x-module\"]]",
    "moduleName": "dummy/templates/docs/api/item.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/cookbook/common-errors", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "zfKT/0OQ",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"common-errors\"],[14,0,\"docs-md__h1\"],[12],[1,\"Common errors\"],[13],[1,\"\\n    \\n      \"],[10,\"h2\"],[14,1,\"date-value-is-not-finite-in-datetimeformat-format-\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#date-value-is-not-finite-in-datetimeformat-format-\"],[14,0,\"heading-anchor\"],[12],[1,\"date value is not finite in DateTimeFormat.format()\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Browser vendors implement date/time parsing differently.  For example, the following will parse correctly in Chrome but fail in Firefox: \"],[10,\"code\"],[12],[1,\"new Intl.DateTimeFormat().format('2015-04-21 20:47:31 GMT');\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"The solution is the ensure that the value you are passing in is in a format which is valid for the \"],[10,\"code\"],[12],[1,\"Date\"],[13],[1,\" constructor.  This library currently does not try and normalize date strings outside of what the browser already implements.\"],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/cookbook/common-errors.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/getting-started/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "7EJ2tZZG",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"overview\"],[14,0,\"docs-md__h1\"],[12],[1,\"Overview\"],[13],[1,\"\\n    \\n      \"],[10,\"h2\"],[14,1,\"what-is-ember-intl-\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#what-is-ember-intl-\"],[14,0,\"heading-anchor\"],[12],[1,\"What is Ember-Intl?\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Ember-intl is an internationalization addon that unlocks \"],[10,\"strong\"],[12],[1,\"translating simple to complex messages\"],[13],[1,\" using built-in \"],[10,\"strong\"],[12],[1,\"pluralization rules\"],[13],[1,\", \"],[10,\"strong\"],[12],[1,\"number and datetime formatting\"],[13],[1,\", with support for \"],[10,\"strong\"],[12],[1,\"over 150 languages\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Ember-intl is now entirely built on native \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl\"],[14,0,\"docs-md__a\"],[12],[1,\"ECMAScript Internationalization APIs\"],[13],[1,\" that are now supported by \"],[10,3],[14,6,\"https://caniuse.com/#feat=internationalization\"],[14,0,\"docs-md__a\"],[12],[1,\"all modern browsers\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"notable-features\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#notable-features\"],[14,0,\"heading-anchor\"],[12],[1,\"Notable Features\"],[13],[13],[1,\"\\n    \\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[1,\"💵 Locale-aware numbers: currencies, decimals, and percentages\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"📅 Locale-aware date and time formatting\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"🕑 Locale-aware display of relative time. i.e, \"],[10,\"code\"],[12],[1,\"\\\"in 1 day\\\"\"],[13],[1,\", \"],[10,\"code\"],[12],[1,\"\\\"2 years ago\\\"\"],[13],[1,\", etc.\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"💬 Translations containing fragments of any of the above\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-icu\"],[12],[1,\"Sale begins {start, date, medium}\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"also built-in pluralization:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-icu\"],[12],[1,\"You have {itemCount, plural,\\n    =0 {no items}\\n    one {# item}\\n    other {# items}\\n}\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[1,\"🌐 Support for 150+ languages.\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"📜 Built on standards such as the \"],[10,3],[14,6,\"https://formatjs.io/docs/core-concepts/icu-syntax\"],[14,0,\"docs-md__a\"],[12],[1,\"ICU message syntax\"],[13],[1,\" & \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl\"],[14,0,\"docs-md__a\"],[12],[1,\"Native Intl API\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"⚡ Extensive Ember Service API and template helpers for formatting and translating.\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"🎉 \"],[8,[39,0],null,[[\"@route\"],[\"docs.advanced.addon-support\"]],[[\"default\"],[[[[1,\"Advanced addon support\"]],[]]]]],[1,\" to provide translations to the host app\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h2\"],[14,1,\"online-community-chat\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#online-community-chat\"],[14,0,\"heading-anchor\"],[12],[1,\"Online Community Chat\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Join the \"],[10,\"code\"],[12],[1,\"topic-i18n\"],[13],[1,\" channel \"],[10,3],[14,6,\"https://discordapp.com/invite/zT3asNS\"],[14,0,\"docs-md__a\"],[12],[1,\"here\"],[13],[1,\" to ask questions and chat with community members in real-time.\"],[13],[1,\"\\n\"],[13]],[],false,[\"docs-link\"]]",
    "moduleName": "dummy/templates/docs/getting-started/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/getting-started/quickstart", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "P3ZRDlvq",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"quickstart\"],[14,0,\"docs-md__h1\"],[12],[1,\"Quickstart\"],[13],[1,\"\\n    \\n      \"],[10,\"h2\"],[14,1,\"1-install-ember-intl\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#1-install-ember-intl\"],[14,0,\"heading-anchor\"],[12],[1,\"1. Install ember-intl\"],[13],[13],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-bash\"],[12],[1,\"ember install ember-intl\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"This will create the following files:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"app/formats.js\"],[13],[1,\"  \"],[3,\" default definitions of named formats \"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"config/ember-intl.js\"],[13],[1,\"  \"],[3,\" default ember-intl settings \"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"translations/en-us.yaml\"],[13],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h2\"],[14,1,\"2-add-your-first-translation\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#2-add-your-first-translation\"],[14,0,\"heading-anchor\"],[12],[1,\"2. Add your first translation\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Create a translation key in \"],[10,\"code\"],[12],[1,\"translations/en-us.yaml\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-yaml\"],[12],[1,\"hello:\\n  world: Hello World!\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"In a template add the following:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"<!-- app/templates/application.hbs -->\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"<\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"h1\"],[13],[1,\">\"],[13],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"hello.world\\\"\"],[13],[1,\"}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"</\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"h1\"],[13],[1,\">\"],[13],[1,\"\\n\\n\"],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[10,1],[14,0,\"hljs-built_in\"],[12],[1,\"outlet\"],[13],[13],[1,\"}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"3-add-a-new-language\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#3-add-a-new-language\"],[14,0,\"heading-anchor\"],[12],[1,\"3. Add a new language\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Create a new translation file: \"],[10,\"code\"],[12],[1,\"translations/fr-fr.yaml\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-yaml\"],[12],[1,\"hello:\\n  world: \\\"Bonjour tout le monde!\\\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"4-configure-ember-intl\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#4-configure-ember-intl\"],[14,0,\"heading-anchor\"],[12],[1,\"4. Configure ember-intl\"],[13],[13],[1,\"\\n    \\n      \"],[10,\"h3\"],[14,1,\"setting-your-applications-runtime-locale\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#setting-your-applications-runtime-locale\"],[14,0,\"heading-anchor\"],[12],[1,\"Setting your applications runtime locale\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"When your application boots, you want to tell ember-intl which locale it should be targeting.  One common approach, is to do this in your top-level \"],[10,\"code\"],[12],[1,\"application\"],[13],[1,\" route's \"],[10,\"code\"],[12],[1,\"beforeModel\"],[13],[1,\" hook.\"],[13],[1,\"\\n\"],[10,2],[12],[10,\"em\"],[12],[1,\"Note:\"],[13],[1,\" This is usually implemented with custom business logic - such as read it off a User model.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app/routes/application.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Route\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/routing/route'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { service } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/service'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"class\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"ApplicationRoute\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"extends\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_ inherited__\"],[12],[1,\"Route\"],[13],[1,\" {\\n  @service intl;\\n\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"beforeModel\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setLocale\"],[13],[1,\"([\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\"]);\\n  }\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"configure-your-template-linter\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#configure-your-template-linter\"],[14,0,\"heading-anchor\"],[12],[1,\"Configure your template linter\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"If your app uses \"],[10,\"code\"],[12],[1,\"ember-cli-template-lint\"],[13],[1,\" (which is installed by default since ember-cli v3.4.1),\\nit is strongly recommanded that you add the \"],[10,\"code\"],[12],[1,\"no-bare-strings\"],[13],[1,\" rule to your template linter.\\nThis rule will prevent you from using plain text strings in your templates (because they cannot be translated).\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"To enabled the template linter rule, edit the file \"],[10,\"code\"],[12],[1,\".template-lintrc.js\"],[13],[1,\" as follow:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// .template-lintrc.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-meta\"],[12],[1,\"'use strict'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"exports\"],[13],[1,\" = {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"extends\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'recommended'\"],[13],[1,\",\\n\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"rules\"],[13],[1,\": {\\n    \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'no-bare-strings'\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"\\n  }\\n};\\n\"],[13],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/getting-started/quickstart.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/getting-started/runtime-requirements", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "I6yydWoB",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"runtime-requirements\"],[14,0,\"docs-md__h1\"],[12],[1,\"Runtime Requirements\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"ember-intl relies on these \"],[10,\"code\"],[12],[1,\"Intl\"],[13],[1,\" APIs:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl.getCanonicalLocales\"],[13],[1,\": Polyfill: \"],[10,3],[14,6,\"https://formatjs.io/docs/polyfills/intl-getcanonicallocales\"],[14,0,\"docs-md__a\"],[12],[1,\"@formatjs/intl-getcanonicallocales\"],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n\"],[10,2],[12],[10,3],[14,6,\"https://caniuse.com/#search=getCanonicalLocales\"],[12],[1,\"\\n  \"],[10,\"img\"],[15,\"src\",[28,[37,0],[\"images/getcanonicallocales.png\"],null]],[12],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl.Locale\"],[13],[1,\": Polyfill: \"],[10,3],[14,6,\"https://formatjs.io/docs/polyfills/intl-locale\"],[14,0,\"docs-md__a\"],[12],[1,\"@formatjs/intl-locale\"],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n\"],[10,2],[12],[10,3],[14,6,\"https://caniuse.com/mdn-javascript_builtins_intl_locale_maximize\"],[12],[1,\"\\n  \"],[10,\"img\"],[15,\"src\",[28,[37,0],[\"images/locale.png\"],null]],[12],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl.NumberFormat\"],[13],[1,\": Available on IE11+. Polyfill: \"],[10,3],[14,6,\"https://formatjs.io/docs/polyfills/intl-numberformat\"],[14,0,\"docs-md__a\"],[12],[1,\"@formatjs/intl-numberformat\"],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n\"],[10,2],[12],[10,3],[14,6,\"https://caniuse.com/#feat=mdn-javascript_builtins_intl_numberformat\"],[12],[1,\"\\n  \"],[10,\"img\"],[15,\"src\",[28,[37,0],[\"images/numberformat.png\"],null]],[12],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl.DateTimeFormat\"],[13],[1,\": Available on IE11+. Polyfill: \"],[10,3],[14,6,\"https://formatjs.io/docs/polyfills/intl-datetimeformat\"],[14,0,\"docs-md__a\"],[12],[1,\"@formatjs/intl-datetimeformat\"],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n\"],[10,2],[12],[10,3],[14,6,\"https://caniuse.com/#feat=mdn-javascript_builtins_intl_datetimeformat\"],[12],[1,\"\\n  \"],[10,\"img\"],[15,\"src\",[28,[37,0],[\"images/datetimeformat.png\"],null]],[12],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl.PluralRules\"],[13],[1,\": Polyfill: \"],[10,3],[14,6,\"https://formatjs.io/docs/polyfills/intl-pluralrules\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"@formatjs/intl-pluralrules\"],[13],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n\"],[10,2],[12],[10,3],[14,6,\"https://caniuse.com/#feat=intl-pluralrules\"],[12],[1,\"\\n  \"],[10,\"img\"],[15,\"src\",[28,[37,0],[\"images/pluralrules.png\"],null]],[12],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl.RelativeTimeFormat\"],[13],[1,\": Polyfill: \"],[10,3],[14,6,\"https://formatjs.io/docs/polyfills/intl-relativetimeformat\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"@formatjs/intl-relativetimeformat\"],[13],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n\"],[10,2],[12],[10,3],[14,6,\"https://caniuse.com/#feat=mdn-javascript_builtins_intl_relativetimeformat\"],[12],[1,\"\\n  \"],[10,\"img\"],[15,\"src\",[28,[37,0],[\"images/relativetimeformat.png\"],null]],[12],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ListFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl.ListFormat\"],[13],[1,\": Polyfill: \"],[10,3],[14,6,\"https://formatjs.io/docs/polyfills/intl-listformat\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"@formatjs/intl-listformat\"],[13],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h2\"],[14,1,\"basic-polyfilling-strategies\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#basic-polyfilling-strategies\"],[14,0,\"heading-anchor\"],[12],[1,\"Basic Polyfilling Strategies\"],[13],[13],[1,\"\\n    \"],[10,\"blockquote\"],[14,0,\"docs-md__blockquote\"],[12],[10,2],[12],[10,\"em\"],[12],[1,\"Important to note\"],[13],[1,\": polyfilling strategies such as lazy-loading or dynamically injecting the script based on the browser requesting the page \"],[10,\"em\"],[12],[1,\"is\"],[13],[1,\" recommended. There are many strategies for doing so and they often vary between projects, so ember-intl avoids trying to solve that story. If you don't yet have a strategy, \"],[10,3],[14,6,\"https://polyfill.io/v3/\"],[14,0,\"docs-md__a\"],[12],[1,\"polyfill.io\"],[13],[1,\" may be a good option.\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,\"h3\"],[14,1,\"adding-formatjs-intl-locale\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#adding-formatjs-intl-locale\"],[14,0,\"heading-anchor\"],[12],[1,\"Adding \"],[10,\"code\"],[12],[1,\"@formatjs/intl-locale\"],[13],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"yarn add @formatjs/intl-locale\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app.js (Ember app entry point)\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-locale/polyfill'\"],[13],[1,\";\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"adding-formatjs-intl-getcanonicallocales\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#adding-formatjs-intl-getcanonicallocales\"],[14,0,\"heading-anchor\"],[12],[1,\"Adding \"],[10,\"code\"],[12],[1,\"@formatjs/intl-getcanonicallocales\"],[13],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"yarn add @formatjs/intl-getcanonicallocales\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app.js (Ember app entry point)\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-getcanonicallocales/polyfill'\"],[13],[1,\";\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"adding-formatjs-intl-pluralrules\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#adding-formatjs-intl-pluralrules\"],[14,0,\"heading-anchor\"],[12],[1,\"Adding \"],[10,\"code\"],[12],[1,\"@formatjs/intl-pluralrules\"],[13],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Requirements: \"],[10,\"code\"],[12],[1,\"Intl.getCanonicalLocales\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"Intl.Locale\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,2],[12],[10,\"code\"],[12],[1,\"yarn add @formatjs/intl-pluralrules\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app.js (Ember app entry point)\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-pluralrules/polyfill'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-pluralrules/locale-data/en'\"],[13],[1,\"; \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// Add English data\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-pluralrules/locale-data/fr'\"],[13],[1,\"; \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// Add French data\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-pluralrules/locale-data/es'\"],[13],[1,\"; \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// Add Spanish data\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// etc.\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"adding-formatjs-intl-relativetimeformat\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#adding-formatjs-intl-relativetimeformat\"],[14,0,\"heading-anchor\"],[12],[1,\"Adding \"],[10,\"code\"],[12],[1,\"@formatjs/intl-relativetimeformat\"],[13],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Requirements: \"],[10,\"code\"],[12],[1,\"Intl.getCanonicalLocales\"],[13],[1,\", \"],[10,\"code\"],[12],[1,\"Intl.Locale\"],[13],[1,\", and \"],[10,\"code\"],[12],[1,\"Intl.PluralRules\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,2],[12],[10,\"code\"],[12],[1,\"yarn add @formatjs/intl-relativetimeformat\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app.js (Ember app entry point)\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-relativetimeformat/polyfill'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-relativetimeformat/locale-data/en'\"],[13],[1,\"; \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// Add English data\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-relativetimeformat/locale-data/fr'\"],[13],[1,\"; \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// Add French data\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@formatjs/intl-relativetimeformat/locale-data/es'\"],[13],[1,\"; \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// Add Spanish data\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// etc.\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[13]],[],false,[\"root-url\"]]",
    "moduleName": "dummy/templates/docs/getting-started/runtime-requirements.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/guide/addon-configs", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "ROeDHaUX",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"addon-configs\"],[14,0,\"docs-md__h1\"],[12],[1,\"Addon Configs\"],[13],[1,\"\\n    \\n      \"],[10,\"h2\"],[14,1,\"input-path\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#input-path\"],[14,0,\"heading-anchor\"],[12],[1,\"Input Path\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Path where translations are stored. This is relative to the project root.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"For example, if your translations are stored as a npm/yarn dependency, then this path would look something like \"],[10,\"code\"],[12],[1,\"'./node_modules/path/to/translations'\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"inputPath\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'translations'\"],[13],[1,\",\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"public-only\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#public-only\"],[14,0,\"heading-anchor\"],[12],[1,\"Public Only\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Prevents the translations from being bundled with the application code. This enables asynchronously loading the translations for the active locale by fetching them from the asset folder of the build.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"publicOnly\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\",\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"wrap-translations-with-namespace\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#wrap-translations-with-namespace\"],[14,0,\"heading-anchor\"],[12],[1,\"Wrap Translations with Namespace\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Add the subdirectories of the translations as a namespace for all keys.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"wrapTranslationsWithNamespace\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\",\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"error-on-named-argument-mismatch\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#error-on-named-argument-mismatch\"],[14,0,\"heading-anchor\"],[12],[1,\"Error on Named Argument Mismatch\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Cause a build error if ICU argument mismatches are detected between translations with the same key across all locales.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"errorOnNamedArgumentMismatch\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\",\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"error-on-missing-translations\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#error-on-missing-translations\"],[14,0,\"heading-anchor\"],[12],[1,\"Error on Missing Translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Cause a build error if missing translations are detected.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"errorOnMissingTranslations\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\",\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"strip-empty-translations\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#strip-empty-translations\"],[14,0,\"heading-anchor\"],[12],[1,\"Strip Empty Translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Removes empty translations from the build output.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"stripEmptyTranslations\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\",\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"requires-translation\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#requires-translation\"],[14,0,\"heading-anchor\"],[12],[1,\"Requires Translation\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"requiresTranslation\"],[13],[1,\" is a function that is called whenever any translation key, from any locale, is missing at build time.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"The default implementation requires all keys to be translated by all locales. For example, if my application supports locales en-US and fr-FR and I create a translation key \\\"home.hero_title\\\" then both locales must implement that key or a warning, or optionally an error, will present itself at build-time.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"Example configuration:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"requiresTranslation\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"key, locale\"],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"if\"],[13],[1,\" (key.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"startsWith\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'wip.'\"],[13],[1,\")) {\\n      \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// ignore any missing translations for keys starting with 'wip.'.\"],[13],[1,\"\\n      \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\";\\n    }\\n\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"if\"],[13],[1,\" (locale === \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'de'\"],[13],[1,\") {\\n      \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// ignore any missing german translations.\"],[13],[1,\"\\n      \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\";\\n    }\\n\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\";\\n  }\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"fallback-locale\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#fallback-locale\"],[14,0,\"heading-anchor\"],[12],[1,\"Fallback Locale\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Merges the fallback locale's translations into all other locales as a build-time fallback strategy.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"This will \"],[10,\"strong\"],[12],[1,\"not\"],[13],[1,\" prevent missing translation warnings or errors from occurring. It's meant as safety net when warnings are enabled. When enabled along with \"],[10,\"code\"],[12],[1,\"errorOnMissingTranslations\"],[13],[1,\" any fallback attempts will result in an error.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"fallbackLocale\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\",\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"filter-locales\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#filter-locales\"],[14,0,\"heading-anchor\"],[12],[1,\"Filter Locales\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"If you need to distribute applications separately in different languages, now we can use \"],[10,\"code\"],[12],[1,\"includeLocales\"],[13],[1,\" or \"],[10,\"code\"],[12],[1,\"excludeLocales\"],[13],[1,\" configuration options.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n{\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"includeLocales\"],[13],[1,\": [\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'zh-cn'\"],[13],[1,\"],\\n  ...\\n}\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[10,\"em\"],[12],[1,\"Note, If you set both \"],[10,\"code\"],[12],[1,\"includeLocales\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"excludeLocales\"],[13],[1,\" options, the \"],[10,\"code\"],[12],[1,\"excludeLocales\"],[13],[1,\" wins!\"],[13],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/guide/addon-configs.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/guide/asynchronously-loading-translations", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "FQc2ISoQ",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"asynchronously-loading-translations\"],[14,0,\"docs-md__h1\"],[12],[1,\"Asynchronously loading translations\"],[13],[1,\"\\n    \\n      \"],[10,\"h2\"],[14,1,\"writing-translations-to-dist-folder\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#writing-translations-to-dist-folder\"],[14,0,\"heading-anchor\"],[12],[1,\"Writing Translations to \"],[10,\"code\"],[12],[1,\"dist\"],[13],[1,\" folder\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"By default, translations stored in \"],[10,\"code\"],[12],[1,\"<project root>/translations/**.{yml,xml}\"],[13],[1,\" are bundled with your application code. Depending on scenario, this may not be an optimal way to ship your translations to the client. If you prefer to opt out of this behavior and just write to somewhere in the \"],[10,\"code\"],[12],[1,\"dist\"],[13],[1,\" folder you can use the \"],[10,\"code\"],[12],[1,\"publicOnly\"],[13],[1,\" option.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"At build time, translations will be now written to the \"],[10,\"code\"],[12],[1,\"dist\"],[13],[1,\" output path instead of bundled within \"],[10,\"code\"],[12],[1,\"app.js\"],[13],[1,\". For an example of how to load these translations at runtime, continue reading the next section.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"exports\"],[13],[1,\" = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"publicOnly\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"\\n  };\\n};\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"pushing-translations-into-ember-intl\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#pushing-translations-into-ember-intl\"],[14,0,\"heading-anchor\"],[12],[1,\"Pushing translations into ember-intl\"],[13],[13],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app/routes/application.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Route\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/routing/route'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { service } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/service'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"class\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"ApplicationRoute\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"extends\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_ inherited__\"],[12],[1,\"Route\"],[13],[1,\" {\\n  @service intl;\\n \\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"async\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"beforeModel\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"const\"],[13],[1,\" response = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"fetch\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'/translations/en-us.json'\"],[13],[1,\");\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"const\"],[13],[1,\" translations = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" response.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"json\"],[13],[1,\"();\\n\\n    \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"addTranslations\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-US'\"],[13],[1,\", translations);\\n  }\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"fingerprinting\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#fingerprinting\"],[14,0,\"heading-anchor\"],[12],[1,\"Fingerprinting\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Add \"],[10,\"code\"],[12],[1,\"json\"],[13],[1,\" files to \"],[10,3],[14,6,\"https://github.com/rickharrison/broccoli-asset-rev\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"broccoli-asset-rev\"],[13],[13],[1,\" settings:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"let\"],[13],[1,\" app = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"new\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"EmberApp\"],[13],[1,\"(defaults, {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"fingerprint\"],[13],[1,\": {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"extensions\"],[13],[1,\": [\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'js'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'css'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'png'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'jpg'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'gif'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'map'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'json'\"],[13],[1,\"]\\n  }\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"As long as the full path to a given translation file is hard-coded and uninterpolated, e.g. \"],[10,\"code\"],[12],[1,\"translations/en-us.json\"],[13],[1,\" instead of \"],[10,\"code\"],[12],[1,\"translations/${language}.json\"],[13],[1,\", broccoli-asset-rev will pick it up and rewrite it in place already.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"For cases where interpolation is required, load \"],[10,\"code\"],[12],[1,\"assetMap\"],[13],[1,\" and enable fingerprinting for it.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"let\"],[13],[1,\" app = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"new\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"EmberApp\"],[13],[1,\"(defaults, {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"fingerprint\"],[13],[1,\": {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"extensions\"],[13],[1,\": [\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'js'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'css'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'png'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'jpg'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'gif'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'map'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'json'\"],[13],[1,\"],\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"generateAssetMap\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\",\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"fingerprintAssetMap\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"\\n  }\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Then fetch \"],[10,\"code\"],[12],[1,\"assetMap\"],[13],[1,\"  in production environment:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-variable constant_\"],[12],[1,\"ENV\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'my-app/config/environment'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"let\"],[13],[1,\" translationPath = \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`translations/\"],[10,1],[14,0,\"hljs-subst\"],[12],[1,\"${lang}\"],[13],[1,\".json`\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"if\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-variable constant_\"],[12],[1,\"ENV\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"environment\"],[13],[1,\" === \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'production'\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"const\"],[13],[1,\" response = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"fetch\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'/assets/assetMap.json'\"],[13],[1,\");\\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"const\"],[13],[1,\" assetMap = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" response.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"json\"],[13],[1,\"();\\n\\n  translationPath = assetMap.\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"assets\"],[13],[1,\"[translationPath];\\n}\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"const\"],[13],[1,\" translations = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"fetch\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`/\"],[10,1],[14,0,\"hljs-subst\"],[12],[1,\"${translationPath}\"],[13],[1,\"`\"],[13],[1,\");\\n\"],[13],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/guide/asynchronously-loading-translations.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/guide/migration-4-0-to-5-0", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "2TMutFke",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"migrating-from-4-0-to-5-0\"],[14,0,\"docs-md__h1\"],[12],[1,\"Migrating from 4.0 to 5.0\"],[13],[1,\"\\n    \\n      \"],[10,\"h2\"],[14,1,\"obsolete\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#obsolete\"],[14,0,\"heading-anchor\"],[12],[1,\"Obsolete\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The \"],[10,\"code\"],[12],[1,\"locales\"],[13],[1,\", \"],[10,\"code\"],[12],[1,\"disablePolyfill\"],[13],[1,\", and \"],[10,\"code\"],[12],[1,\"autoPolyfill\"],[13],[1,\" configuration options in \"],[10,\"code\"],[12],[1,\"config/ember-intl.js\"],[13],[1,\" are no longer used and can be safely removed.\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"breaking-changes\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#breaking-changes\"],[14,0,\"heading-anchor\"],[12],[1,\"Breaking Changes\"],[13],[13],[1,\"\\n    \\n      \"],[10,\"h3\"],[14,1,\"translations\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#translations\"],[14,0,\"heading-anchor\"],[12],[1,\"Translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Improved ICU-spec compliance, special characters are now escaped via a single quote \"],[10,\"code\"],[12],[1,\"'\"],[13],[1,\" instead of a slash \"],[10,\"code\"],[12],[1,\"\\\\\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,2],[12],[10,\"strong\"],[12],[1,\"NOTE\"],[13],[1,\": This change is advised for all future translations, however \"],[10,\"code\"],[12],[1,\"\\\\\"],[13],[1,\" escaping is backwards-compatible starting with the \"],[10,3],[14,6,\"https://github.com/ember-intl/ember-intl/releases/tag/v5.5.0\"],[14,0,\"docs-md__a\"],[12],[1,\"v5.5.0 release\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"node-runtime\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#node-runtime\"],[14,0,\"heading-anchor\"],[12],[1,\"Node runtime\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"We now support down to Node 10, dropping support for Node 8.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"polyfilling\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#polyfilling\"],[14,0,\"heading-anchor\"],[12],[1,\"Polyfilling\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"This addon no longer provides polyfills \\\"out of the box.\\\" The reasoning, along with the current browser requirements, can be found in the \"],[8,[39,0],null,[[\"@route\"],[\"docs.getting-started.runtime-requirements\"]],[[\"default\"],[[[[1,\"Runtime Requirements\"]],[]]]]],[1,\" section.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"I highly encourage you read through all the browser support matrices within the \"],[8,[39,0],null,[[\"@route\"],[\"docs.getting-started.runtime-requirements\"]],[[\"default\"],[[[[1,\"Runtime Requirements\"]],[]]]]],[1,\" to ensure it aligns with your projects runtime targets.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"lookup-missing-translations\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#lookup-missing-translations\"],[14,0,\"heading-anchor\"],[12],[10,\"code\"],[12],[1,\"lookup()\"],[13],[1,\" missing translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"intl.lookup()\"],[13],[1,\" will no longer return \"],[10,\"code\"],[12],[1,\"\\\"Missing translations\\\"\"],[13],[1,\" or emit any runtime warnings. If a translation is missing, \"],[10,\"code\"],[12],[1,\"undefined\"],[13],[1,\" is returned from the method.\"],[13],[1,\"\\n\"],[10,2],[12],[10,\"strong\"],[12],[1,\"NOTE\"],[13],[1,\": This does not impact \"],[10,\"code\"],[12],[1,\"intl.t()\"],[13],[1,\" or the \"],[10,\"code\"],[12],[1,\"{{t}}\"],[13],[1,\" API for when missing translations occurs. Missing translation behavior for those flows remains the same as found in 4.x.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"intl-relativetimeformat\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#intl-relativetimeformat\"],[14,0,\"heading-anchor\"],[12],[10,\"code\"],[12],[1,\"Intl.RelativeTimeFormat\"],[13],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"When we introduced FormatRelative, the spec for \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"Intl.RelativeTimeFormat\"],[13],[13],[1,\" was still under development. It has now reached stage 3 and multiple browsers have implemented it. However, the API is quite different from the spec we had implemented so we've had to adjust the API to match the spec which means it's not backwards compatible.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"Changes:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"units\"],[13],[1,\" is now \"],[10,\"code\"],[12],[1,\"unit\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"style\"],[13],[1,\" becomes \"],[10,\"code\"],[12],[1,\"numeric\"],[13],[1,\" (the default)\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"Type of \"],[10,\"code\"],[12],[1,\"value\"],[13],[1,\" is no longer a \"],[10,\"code\"],[12],[1,\"Date\"],[13],[1,\" instance but rather delta in the specified \"],[10,\"code\"],[12],[1,\"unit\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"interval\"],[13],[1,\" was removed from the format-relative helper\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"now\"],[13],[1,\" was removed from the format-relative helper\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h3\"],[14,1,\"compact-number-formatter\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#compact-number-formatter\"],[14,0,\"heading-anchor\"],[12],[1,\"Compact Number Formatter\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"In 4.x, we introduced a shortNumber formatter. This is no longer necessary as we can rely on the native \"],[10,\"code\"],[12],[1,\"Intl.NumberFormat\"],[13],[1,\" to compact numbers into their abbreviated form.\"],[13],[1,\"\\n\"],[10,2],[12],[10,\"code\"],[12],[1,\"{numCustomers, shortNumber}\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"becomes\"],[13],[1,\"\\n\"],[10,2],[12],[10,\"code\"],[12],[1,\"{numCustomers, number, compact}\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"or\"],[13],[1,\"\\n\"],[10,2],[12],[10,\"code\"],[12],[1,\"{{format-number numCustomers notation=\\\"compact\\\"}}\"],[13],[13],[1,\"\\n\"],[13]],[],false,[\"docs-link\"]]",
    "moduleName": "dummy/templates/docs/guide/migration-4-0-to-5-0.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/guide/missing-translations", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "qM7kt9ho",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"missing-translations\"],[14,0,\"docs-md__h1\"],[12],[1,\"Missing translations\"],[13],[1,\"\\n    \\n      \"],[10,\"h2\"],[14,1,\"at-runtime\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#at-runtime\"],[14,0,\"heading-anchor\"],[12],[1,\"At runtime\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"When a translation does not exist, \"],[10,\"code\"],[12],[1,\"ember-intl\"],[13],[1,\" will import and invoked a function from the location \"],[10,\"code\"],[12],[1,\"app/utils/intl/missing-message.js\"],[13],[1,\". It is provided three argumnets: \"],[10,\"code\"],[12],[1,\"key: String\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"locales: String[]\"],[13],[1,\" as arguments.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"The default implementation is to return \"],[10,\"code\"],[12],[1,\"\\\"Missing translation: [key]\\\"\"],[13],[1,\", but can be overridden by exporting a function from \"],[10,\"code\"],[12],[1,\"app/utils/intl/missing-message.js\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"Here is how you might implement your own error handler:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app/utils/intl/missing-message.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"missingMessage\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"key, locales\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"throw\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"new\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Error\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`[ember-intl] Missing translation for key: \\\"\"],[10,1],[14,0,\"hljs-subst\"],[12],[1,\"${key}\"],[13],[1,\"\\\" for locales: \\\"\"],[10,1],[14,0,\"hljs-subst\"],[12],[1,\"${locales}\"],[13],[1,\"\\\"`\"],[13],[1,\");\\n}\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"at-build-time\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#at-build-time\"],[14,0,\"heading-anchor\"],[12],[1,\"At build-time\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"ember-intl\"],[13],[1,\" automatically detects missing translations at build-time.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"If you don't like the default behavior, you can control the detection by configuring \"],[10,\"code\"],[12],[1,\"errorOnMissingTranslations\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"requiresTranslation\"],[13],[1,\" in your \"],[10,\"code\"],[12],[1,\"config/ember-intl.js\"],[13],[1,\" configuration file. By default, \"],[10,\"code\"],[12],[1,\"ember-intl\"],[13],[1,\" will emit warnings to stdout but will not fail the build.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"throwing-a-build-error-on-missing-when-required-translations\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#throwing-a-build-error-on-missing-when-required-translations\"],[14,0,\"heading-anchor\"],[12],[1,\"Throwing a build error on missing (when required) translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Setting \"],[10,\"code\"],[12],[1,\"errorOnMissingTranslations\"],[13],[1,\" to \"],[10,\"code\"],[12],[1,\"true\"],[13],[1,\" will cause ember-intl to throw a build error if missing (and when required) translations were spotted during bundling.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"This changes the default behavior where missing translations are only logged as build warnings.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"Given the following configuration, any missing translation in any locale, will cause a build error to be thrown.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"exports\"],[13],[1,\" = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"/* env */\"],[13],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"errorOnMissingTranslations\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"\\n  };\\n};\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"requiring-translations\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#requiring-translations\"],[14,0,\"heading-anchor\"],[12],[1,\"Requiring translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"requiresTranslation\"],[13],[1,\" is a function that is called whenever any translation key, from any locale, is missing.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"The default implementation requires all keys to be translated by all locales. For example, if my application supports locales en-US and fr-FR and I create a translation key \"],[10,\"code\"],[12],[1,\"\\\"home.hero_title\\\"\"],[13],[1,\" then both locales must implement that key or a warning, or optionally an error, will present itself at build-time.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"Example configuration:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// config/ember-intl.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"exports\"],[13],[1,\" = \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"/* env */\"],[13],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" {\\n    \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"requiresTranslation\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"key, locale\"],[13],[1,\") {\\n      \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"if\"],[13],[1,\" (key.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"startsWith\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'wip.'\"],[13],[1,\")) {\\n        \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// ignore any missing translations for keys starting with 'wip.'.\"],[13],[1,\"\\n        \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\";\\n      }\\n\\n      \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"if\"],[13],[1,\" (locale === \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'de'\"],[13],[1,\") {\\n        \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// ignore any missing german translations.\"],[13],[1,\"\\n        \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"false\"],[13],[1,\";\\n      }\\n\\n      \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\";\\n    }\\n  };\\n};\\n\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-yaml\"],[12],[1,\"# translations/en.yaml\\npage:\\n  title: Page title\\n  description: Page description\\nwip:\\n  title: WIP title\\n\\n# translations/de.yaml\\n# nothing to see here\\n\\n# translations/it.yaml\\npage:\\n  title: Titolo della pagina\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"If an ember-intl project is configured with the following implementation of this method, the following will print to the console:\"],[13],[1,\"\\n\"],[10,\"blockquote\"],[14,0,\"docs-md__blockquote\"],[12],[10,2],[12],[10,\"code\"],[12],[1,\"page.description\"],[13],[1,\" is missing in \"],[10,\"code\"],[12],[1,\"it\"],[13],[13],[1,\"\\n\"],[13],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/guide/missing-translations.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/guide/service-api", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "oVRDJOi5",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"service-api\"],[14,0,\"docs-md__h1\"],[12],[1,\"Service API\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"ember-intl ships with a service which exposes an API to programmatically\\ninterface with all the known functionality exposed through the declarative\\nhelpers.\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"how-to-inject-the-service\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#how-to-inject-the-service\"],[14,0,\"heading-anchor\"],[12],[1,\"How to inject the service\"],[13],[13],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Controller\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/controller'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { service } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/service'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"class\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"MyController\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"extends\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_ inherited__\"],[12],[1,\"Controller\"],[13],[1,\" {\\n  @service intl;\\n}\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Access the service from within the instance via: \"],[10,\"code\"],[12],[1,\"this.get('intl')\"],[13],[1,\", or just \"],[10,\"code\"],[12],[1,\"this.intl\"],[13],[1,\" if you have \"],[10,3],[14,6,\"https://www.emberjs.com/blog/2018/04/13/ember-3-1-released.html#toc_es5-getters-for-computed-properties-2-of-4\"],[14,0,\"docs-md__a\"],[12],[1,\"ES5 getters enabled\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"properties\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#properties\"],[14,0,\"heading-anchor\"],[12],[1,\"Properties\"],[13],[13],[1,\"\\n    \\n      \"],[10,\"h3\"],[14,1,\"locale\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#locale\"],[14,0,\"heading-anchor\"],[12],[1,\"locale\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Set/get the current locale for your application. The value you set it to can either be a string or an array of strings. When providing an array, the \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" helper and \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" method will attempt to try all the locales in order when resolving a translation key. This is useful if you want to always fallback to another locale when a translation may be missing.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"When you get this property, it will always return an array of strings, even if you have set it to be just one single locale. If you are only interested in retrieving the single (or first) locale, use \"],[10,\"code\"],[12],[1,\"primaryLocale\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"primarylocale-readonly\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#primarylocale-readonly\"],[14,0,\"heading-anchor\"],[12],[1,\"primaryLocale \"],[10,\"em\"],[12],[1,\"readOnly\"],[13],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Returns the first locale of the currently active locales, i.e. the first object of the \"],[10,\"code\"],[12],[1,\"locale\"],[13],[1,\" property.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"primaryLocale\"],[13],[1,\"  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// 'en-us'\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"locales-readonly\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#locales-readonly\"],[14,0,\"heading-anchor\"],[12],[1,\"locales \"],[10,\"em\"],[12],[1,\"readOnly\"],[13],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Returns an array of locales that have translations assigned to them. This works\\nwith both bundled translations and lazy-loaded translations.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"locales\"],[13],[1,\"  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// ['en-us', 'en-ca', 'fr-fr'];\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"methods\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#methods\"],[14,0,\"heading-anchor\"],[12],[1,\"Methods\"],[13],[13],[1,\"\\n    \\n      \"],[10,\"h3\"],[14,1,\"t-translationkey-string-optionaloptions-object-string-safestring\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#t-translationkey-string-optionaloptions-object-string-safestring\"],[14,0,\"heading-anchor\"],[12],[1,\"t \"],[10,\"em\"],[12],[1,\"(translationKey:String, optionalOptions:Object)\"],[13],[1,\": String | SafeString\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Unlike \"],[10,\"code\"],[12],[1,\"formatMessage\"],[13],[1,\", the \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" method accepts a translation key instead of a\\ntranslation string. This method returns a translated string. To provide\\nvalues to the dynamic segment of the translation, pass an object hash.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-yaml\"],[12],[1,\"product: '{name} will cost {price, number, USD}'\\n\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app/formats.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"number\"],[13],[1,\": {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"USD\"],[13],[1,\": {\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"style\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'currency'\"],[13],[1,\",\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"currency\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'USD'\"],[13],[1,\",\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"minimumFractionDigits\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-number\"],[12],[1,\"2\"],[13],[1,\"\\n    }\\n  }\\n};\\n\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"t\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'product'\"],[13],[1,\", {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"name\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'watch'\"],[13],[1,\",\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"price\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-number\"],[12],[1,\"300\"],[13],[1,\"\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Output:\"],[13],[1,\"\\n\"],[10,\"blockquote\"],[14,0,\"docs-md__blockquote\"],[12],[10,2],[12],[1,\"watch will cost $300\"],[13],[1,\"\\n\"],[13],[10,2],[12],[1,\"By default, ember-intl's \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" method and \"],[10,\"code\"],[12],[1,\"formatMessage\"],[13],[1,\" will return a String literal. If your translations contain HTML markup and you want to use render HTML from your translations to the document then pass \"],[10,\"code\"],[12],[1,\"htmlSafe=true\"],[13],[1,\" to either \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" & \"],[10,\"code\"],[12],[1,\"format-message\"],[13],[1,\" helpers or \"],[10,\"code\"],[12],[1,\"{ htmlSafe: true }\"],[13],[1,\" to \"],[10,\"code\"],[12],[1,\"intl.t()\"],[13],[1,\" or \"],[10,\"code\"],[12],[1,\"intl.formatMessage()\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"t\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'title.header'\"],[13],[1,\", { \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"htmlSafe\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\" });\\n\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"title.header\\\"\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"htmlSafe\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"formatmessage-translation-string-optionaloptions-object-string\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#formatmessage-translation-string-optionaloptions-object-string\"],[14,0,\"heading-anchor\"],[12],[1,\"formatMessage \"],[10,\"em\"],[12],[1,\"(translation:String, optionalOptions:Object)\"],[13],[1,\": String\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"formatMessage\"],[13],[1,\" formats a translation string. Unlike the \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" method, it\\naccepts a translation string instead of a translation key.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"formatMessage\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'{name} will cost {price, number, USD}'\"],[13],[1,\", {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"name\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'watch'\"],[13],[1,\",\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"price\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-number\"],[12],[1,\"300\"],[13],[1,\"\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Output:\"],[13],[1,\"\\n\"],[10,\"blockquote\"],[14,0,\"docs-md__blockquote\"],[12],[10,2],[12],[1,\"watch will cost $300\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,\"h3\"],[14,1,\"formatmessage-html-value-string-optionaloptions-object-safestring\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#formatmessage-html-value-string-optionaloptions-object-safestring\"],[14,0,\"heading-anchor\"],[12],[1,\"formatMessage (html) \"],[10,\"em\"],[12],[1,\"(value:String, optionalOptions:Object)\"],[13],[1,\": SafeString\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"formatMessage\"],[13],[1,\", when provided the \"],[10,\"code\"],[12],[1,\"htmlSafe\"],[13],[1,\" options, formats a translation string and returns an\\n\"],[10,\"code\"],[12],[1,\"Handlebars.SafeString\"],[13],[1,\". This is useful for rendering translations containing\\nHTML markup. Since options can contain unsafe markup, all attribute hash\\nvalues are escaped.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"By default, all XML-like tags inside a translation must be escaped in order to build.  You escape\\nby using single quotes around the tag.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"formatMessage\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"'<strong>'{firstName}'</strong>' {lastName}\\\"\"],[13],[1,\", {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"firstName\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'John'\"],[13],[1,\",\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"lastName\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"'<em>'Doe'</em>'\\\"\"],[13],[1,\",\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"htmlSafe\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Output:\"],[13],[1,\"\\n\"],[10,\"blockquote\"],[14,0,\"docs-md__blockquote\"],[12],[10,2],[12],[10,\"strong\"],[12],[1,\"John\"],[13],[1,\" \"],[10,\"em\"],[12],[1,\"Doe\"],[13],[13],[1,\"\\n\"],[13],[10,2],[12],[1,\"Note, the Doe is escaped and does not return markup.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"formatnumber-value-number-optionaloptions-object-string\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#formatnumber-value-number-optionaloptions-object-string\"],[14,0,\"heading-anchor\"],[12],[1,\"formatNumber \"],[10,\"em\"],[12],[1,\"(value:Number, optionalOptions:Object)\"],[13],[1,\": String\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Documentation missing\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"formatdate-value-date-number-string-optionaloptions-object-string\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#formatdate-value-date-number-string-optionaloptions-object-string\"],[14,0,\"heading-anchor\"],[12],[1,\"formatDate \"],[10,\"em\"],[12],[1,\"(value:Date/Number/String, optionalOptions:Object)\"],[13],[1,\": String\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Documentation missing\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"formattime-value-date-number-string-optionaloptions-object-string\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#formattime-value-date-number-string-optionaloptions-object-string\"],[14,0,\"heading-anchor\"],[12],[1,\"formatTime \"],[10,\"em\"],[12],[1,\"(value:Date/Number/String, optionalOptions:Object)\"],[13],[1,\": String\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Documentation missing\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"formatrelative-delta-number-unit-string-string\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#formatrelative-delta-number-unit-string-string\"],[14,0,\"heading-anchor\"],[12],[1,\"formatRelative \"],[10,\"em\"],[12],[1,\"(delta:Number, unit:String)\"],[13],[1,\": String\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Documentation missing\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"exists-translationkey-string-optionallocale-string-boolean\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#exists-translationkey-string-optionallocale-string-boolean\"],[14,0,\"heading-anchor\"],[12],[1,\"exists \"],[10,\"em\"],[12],[1,\"(translationKey:String, optionalLocale:String)\"],[13],[1,\": Boolean\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Returns a boolean indicating whether the translation exists. Locale is\\noptional. If omitted, the current/active locale is used in it's place.\\nThis method always returns a Boolean.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"exists\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'foo.bar'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\");  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// true\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"addtranslations-locale-string-payload-object-void\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#addtranslations-locale-string-payload-object-void\"],[14,0,\"heading-anchor\"],[12],[1,\"addTranslations \"],[10,\"em\"],[12],[1,\"(locale:String, payload:Object)\"],[13],[1,\": void\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Adds a translations to a given locale. Useful for registering translations at runtime.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"lookup-translationkey-string-optionallocale-string-array-string-optionaloptions-object-string-undefined\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#lookup-translationkey-string-optionallocale-string-array-string-optionaloptions-object-string-undefined\"],[14,0,\"heading-anchor\"],[12],[1,\"lookup \"],[10,\"em\"],[12],[1,\"(translationKey:String, optionalLocale:String | Array{String}, optionalOptions:Object)\"],[13],[1,\": String | undefined\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Given a translation key, will return the translation for either the active\\nlocale, or the locale specified as the second argument.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"lookup\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'shared.confirmMessage'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\", {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"resilient\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Returns \"],[10,\"code\"],[12],[1,\"undefined\"],[13],[1,\" if you pass \"],[10,\"code\"],[12],[1,\"{ resilient: true }\"],[13],[1,\". If ommitted, will return a missing translation message.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"setlocale-locale-string-array-string-void\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#setlocale-locale-string-array-string-void\"],[14,0,\"heading-anchor\"],[12],[1,\"setLocale \"],[10,\"em\"],[12],[1,\"(locale:String | Array{String})\"],[13],[1,\": void\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Documentation missing\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"translationsfor-localename-string-object-undefined\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#translationsfor-localename-string-object-undefined\"],[14,0,\"heading-anchor\"],[12],[1,\"translationsFor \"],[10,\"em\"],[12],[1,\"(localeName:String)\"],[13],[1,\": Object | undefined\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Documentation missing\"],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/guide/service-api.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/guide/testing", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "cH6MpHcU",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"testing\"],[14,0,\"docs-md__h1\"],[12],[1,\"Testing\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"ember-intl provides some convenience test helpers for easy mocking of\\ntranslations and running assertions against translated strings.\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"setupintl-hooks-locale-translations-\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#setupintl-hooks-locale-translations-\"],[14,0,\"heading-anchor\"],[12],[1,\"setupIntl(hooks, [locale], [translations])\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"This helper does two main things:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[1,\"It makes the \"],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\" service available as \"],[10,\"code\"],[12],[1,\"this.intl\"],[13],[1,\" in your current test\\ncontext for easier access.\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"It registers a custom \"],[10,\"code\"],[12],[1,\"missing-message\"],[13],[1,\" util, that deterministically\\nserializes all not explicitly defined translations. This allows you to focus\\non the actual logic in your tests and not on providing / mocking translations.\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"It can be invoked in four different ways.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"setupintl-hooks-\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#setupintl-hooks-\"],[14,0,\"heading-anchor\"],[12],[1,\"setupIntl(hooks)\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Just injects \"],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\" into the context and enables deterministic serialization of\\nmissing translations. Also take a look at the \"],[10,3],[14,6,\"#t-key-options-\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" helper\"],[13],[1,\"\\nfurther down, that makes asserting against these translations a breeze.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { render } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/test-helpers'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { hbs } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-cli-htmlbars'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupIntl } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl/test-support'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupRenderingTest } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-qunit'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\", test } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'qunit'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"module\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'setupIntl demo'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"hooks\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupRenderingTest\"],[13],[1,\"(hooks);\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupIntl\"],[13],[1,\"(hooks);\\n\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"test\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'it serializes missing translations and injects the `intl` service'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"async\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"assert\"],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"render\"],[13],[1,\"(hbs\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`\\n      {{t \\\"some.translation\\\" someVariable=\\\"Hello\\\"}}\\n    `\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"dom\"],[13],[1,\"().\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"hasText\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'t:some.translation:(\\\"someVariable\\\":\\\"Hello\\\")'\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"strictEqual\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"owner\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"resolve\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'service:intl'\"],[13],[1,\"));\\n  });\\n});\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"setupintl-hooks-locale-\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#setupintl-hooks-locale-\"],[14,0,\"heading-anchor\"],[12],[1,\"setupIntl(hooks, locale)\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Does what \"],[10,\"code\"],[12],[1,\"setupIntl(hooks)\"],[13],[1,\" does and also sets the locale. You can also use\\n\"],[10,3],[14,6,\"#setlocale-locale-\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"setLocale(locale)\"],[13],[13],[1,\" for that.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { hbs } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-cli-htmlbars'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupIntl } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl/test-support'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupRenderingTest } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-qunit'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\", test } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'qunit'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"module\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'setupIntl demo'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"hooks\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupRenderingTest\"],[13],[1,\"(hooks);\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupIntl\"],[13],[1,\"(hooks, \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\");\\n\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"test\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'it sets the locale'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"async\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"assert\"],[13],[1,\") {\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"deepEqual\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"locale\"],[13],[1,\", [\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\"]);\\n  });\\n});\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"setupintl-hooks-translations-\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#setupintl-hooks-translations-\"],[14,0,\"heading-anchor\"],[12],[1,\"setupIntl(hooks, translations)\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Does what \"],[10,\"code\"],[12],[1,\"setupIntl(hooks)\"],[13],[1,\" does and adds translations to the active locale.\\nYou can also use \"],[10,3],[14,6,\"#addtranslations-locale-translations-\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"addTranslations([locale], translations)\"],[13],[13],[1,\"\\nfor that.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { render } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/test-helpers'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { hbs } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-cli-htmlbars'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupIntl } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl/test-support'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupRenderingTest } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-qunit'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\", test } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'qunit'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"module\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'setupIntl demo'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"hooks\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupRenderingTest\"],[13],[1,\"(hooks);\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupIntl\"],[13],[1,\"(hooks, {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"some\"],[13],[1,\": {\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"mocked\"],[13],[1,\": {\\n        \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"translations\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Hello {thing}'\"],[13],[1,\",\\n      },\\n    },\\n  });\\n\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"test\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'it renders'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"async\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"assert\"],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"render\"],[13],[1,\"(hbs\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`\\n      {{t \\\"some.mocked.translation\\\" thing=\\\"world\\\"}}\\n    `\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"dom\"],[13],[1,\"().\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"hasText\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Hello world'\"],[13],[1,\");\\n\\n    \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// stuff that is not explicitly mocked uses fallback serialization\"],[13],[1,\"\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"render\"],[13],[1,\"(hbs\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`\\n      {{t \\\"some.translation\\\" someVariable=\\\"Hello\\\"}}\\n    `\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"dom\"],[13],[1,\"().\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"hasText\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'t:some.translation:(\\\"someVariable\\\":\\\"Hello\\\")'\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"strictEqual\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"owner\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"resolve\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'service:intl'\"],[13],[1,\"));\\n  });\\n});\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"setupintl-hooks-locale-translations-\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#setupintl-hooks-locale-translations-\"],[14,0,\"heading-anchor\"],[12],[1,\"setupIntl(hooks, locale, translations)\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Combination of the previous two. Sets the locale and also adds the translations.\\nYou can also use \"],[10,3],[14,6,\"#setlocale-locale-\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"setLocale(locale)\"],[13],[13],[1,\" and\\n\"],[10,3],[14,6,\"#addtranslations-locale-translations-\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"addTranslations([locale], translations)\"],[13],[13],[1,\"\\nfor that.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { render } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/test-helpers'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { hbs } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-cli-htmlbars'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupIntl } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl/test-support'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupRenderingTest } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-qunit'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\", test } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'qunit'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"module\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'setupIntl demo'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"hooks\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupRenderingTest\"],[13],[1,\"(hooks);\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupIntl\"],[13],[1,\"(hooks, \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\", {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"some\"],[13],[1,\": {\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"mocked\"],[13],[1,\": {\\n        \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"translations\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Hello {thing}'\"],[13],[1,\",\\n      },\\n    },\\n  });\\n\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"test\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'it sets the locale and mocks the translations'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"async\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"assert\"],[13],[1,\") {\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"deepEqual\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"locale\"],[13],[1,\", [\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\"]);\\n\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"render\"],[13],[1,\"(hbs\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`\\n      {{t \\\"some.mocked.translation\\\" thing=\\\"world\\\"}}\\n    `\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"dom\"],[13],[1,\"().\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"hasText\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Hello world'\"],[13],[1,\");\\n\\n    \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// stuff that is not explicitly mocked uses fallback serialization\"],[13],[1,\"\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"render\"],[13],[1,\"(hbs\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`\\n      {{t \\\"some.translation\\\" someVariable=\\\"Hello\\\"}}\\n    `\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"dom\"],[13],[1,\"().\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"hasText\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'t:some.translation:(\\\"someVariable\\\":\\\"Hello\\\")'\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"strictEqual\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"owner\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"resolve\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'service:intl'\"],[13],[1,\"));\\n  });\\n});\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"setlocale-locale-\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#setlocale-locale-\"],[14,0,\"heading-anchor\"],[12],[1,\"setLocale(locale)\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Behaves as if you called \"],[10,\"code\"],[12],[1,\"setLocale(locale)\"],[13],[1,\" on the \"],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\" service.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { hbs } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-cli-htmlbars'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupIntl, setLocale } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl/test-support'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupRenderingTest } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-qunit'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\", test } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'qunit'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"module\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'setLocale demo'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"hooks\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupRenderingTest\"],[13],[1,\"(hooks);\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupIntl\"],[13],[1,\"(hooks);\\n\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"test\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'it sets the locale'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"async\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"assert\"],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setLocale\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"deepEqual\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"locale\"],[13],[1,\", [\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\"]);\\n\\n    \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setLocale\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'de-de'\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"deepEqual\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"locale\"],[13],[1,\", [\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'de-de'\"],[13],[1,\"]);\\n  });\\n});\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"addtranslations-locale-translations-\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#addtranslations-locale-translations-\"],[14,0,\"heading-anchor\"],[12],[1,\"addTranslations([locale], translations)\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Behaves as if you called \"],[10,\"code\"],[12],[1,\"addTranslations(locale, translations)\"],[13],[1,\" on the \"],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\"\\nservice. For your convenience you can omit the \"],[10,\"code\"],[12],[1,\"locale\"],[13],[1,\" parameter and it will\\ndefault to the last currently active locale, meaning that if your current\\nlocales were \"],[10,\"code\"],[12],[1,\"['en-ca', 'en-gb', 'en-us']\"],[13],[1,\", the translations would be added to\\n\"],[10,\"code\"],[12],[1,\"'en-us'\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { hbs } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-cli-htmlbars'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { addTranslations, setupIntl, setLocale } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl/test-support'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupRenderingTest } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-qunit'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\", test } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'qunit'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"module\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'addTranslations demo'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"hooks\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupRenderingTest\"],[13],[1,\"(hooks);\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupIntl\"],[13],[1,\"(hooks);\\n\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"test\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'it adds the translations'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"async\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"assert\"],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setLocale\"],[13],[1,\"([\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-ca'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-gb'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\"]);\\n\\n    \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"addTranslations\"],[13],[1,\"({\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"translation\"],[13],[1,\": {\\n        \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"on\"],[13],[1,\": {\\n          \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"enUs\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"What?\\\"\"],[13],[1,\",\\n        },\\n      },\\n    });\\n\\n    \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"addTranslations\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-ca'\"],[13],[1,\", {\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"translation\"],[13],[1,\": {\\n        \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"on\"],[13],[1,\": {\\n          \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"enCa\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Eh?'\"],[13],[1,\",\\n        },\\n      },\\n    });\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"true\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"exists\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'translation.on.enUs'\"],[13],[1,\"));\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"true\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"exists\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-ca'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'translation.on.enCa'\"],[13],[1,\"));\\n  });\\n});\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"t-key-options-\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#t-key-options-\"],[14,0,\"heading-anchor\"],[12],[1,\"t(key, [options])\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" helper is a shortcut for accessing the \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" method on the \"],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\" service.\\nIn combination with the fallback serialization behavior of \"],[10,\"code\"],[12],[1,\"setupIntl(hooks)\"],[13],[1,\",\\nit becomes especially useful, because you now don't need to worry about how to\\nprovide translations or mock them for tests.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"Your case can now focus on testing what you actually want to test: that the\\ncorrect translation is rendered with the correct variables. And not that the\\ntranslation messages are there and correctly interpolated by ember-intl.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { render } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/test-helpers'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { hbs } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-cli-htmlbars'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupIntl, t } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl/test-support'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { setupRenderingTest } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-qunit'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"module\"],[13],[1,\", test } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'qunit'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"module\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'t demo'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"hooks\"],[13],[1,\") {\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupRenderingTest\"],[13],[1,\"(hooks);\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"setupIntl\"],[13],[1,\"(hooks);\\n\\n  \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"test\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'it is a shortcut for accessing translations'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"async\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"assert\"],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"await\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"render\"],[13],[1,\"(hbs\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"`\\n      {{t \\\"some.translation\\\" someVariable=\\\"Hello\\\"}}\\n    `\"],[13],[1,\");\\n\\n    assert.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"dom\"],[13],[1,\"().\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"hasText\"],[13],[1,\"(\\n      \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"t\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'some.translation'\"],[13],[1,\", { \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"someVariable\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Hello'\"],[13],[1,\" })\\n    );\\n  });\\n});\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"guarding-against-errors\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#guarding-against-errors\"],[14,0,\"heading-anchor\"],[12],[1,\"Guarding against errors\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"If you have a dynamic, variable driven usage of the \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" helper, you might see an error like \"],[10,\"code\"],[12],[1,\"helper requires value attribute\"],[13],[1,\". This might commonly happen in testing environments, where you might not have ensured every single variable has a value, and are trying to test something else entirely. To allow for empty values, you can use \"],[10,\"code\"],[12],[1,\"allowEmpty\"],[13],[1,\" on the helper itself or you can set it globally for all helpers, by defining you own helper.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// app/helpers/t.js\"],[13],[1,\"\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Helper\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl/helpers/t'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"class\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"extends\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Helper\"],[13],[1,\" {\\n  allowEmpty = \"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\";\\n}\\n\"],[13],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/guide/testing.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/guide/translating-text", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "2GFD65xM",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"translating-text\"],[14,0,\"docs-md__h1\"],[12],[1,\"Translating Text\"],[13],[1,\"\\n    \\n      \"],[10,\"h2\"],[14,1,\"translations\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#translations\"],[14,0,\"heading-anchor\"],[12],[1,\"Translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Translations are defined in \"],[10,3],[14,6,\"https://formatjs.io/docs/core-concepts/icu-syntax\"],[14,0,\"docs-md__a\"],[12],[1,\"ICU message syntax\"],[13],[1,\" and stored in\\n\"],[10,\"code\"],[12],[1,\"<root>/translations\"],[13],[1,\" in JSON or YAML format. Nested objects are supported within your translation files.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"nested-translations\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#nested-translations\"],[14,0,\"heading-anchor\"],[12],[1,\"Nested translations\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Translations can be organized in nested directories:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[12],[1,\"/translations\\n  en-us.yaml\\n  en-gb.yaml\\n  /blog\\n    en-us.yaml\\n    en-gb.yaml\\n  /reports\\n    en-us.yaml\\n    en-gb.yaml\\n  /commerce\\n    en-us.yaml\\n    en-gb.yaml\\n    /cart\\n      en-us.yaml\\n      en-gb.yaml\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"the-wraptranslationswithnamespace-option\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#the-wraptranslationswithnamespace-option\"],[14,0,\"heading-anchor\"],[12],[1,\"The \"],[10,\"code\"],[12],[1,\"wrapTranslationsWithNamespace\"],[13],[1,\" option\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"By default, the keys of the translations are not changed when nested directories are created. With the option\\n\"],[10,\"code\"],[12],[1,\"wrapTranslationsWithNamespace\"],[13],[1,\" activated, ember-intl will wrap the keys of the translations with the names of\\nthe subdirectories.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"When \"],[10,\"code\"],[12],[1,\"wrapTranslationsWithNamespace\"],[13],[1,\" is \"],[10,\"code\"],[12],[1,\"true\"],[13],[1,\", a translation under \"],[10,\"code\"],[12],[1,\"<root>/translations/commerce/cart\"],[13],[1,\"\\nwith the key \"],[10,\"code\"],[12],[1,\"title\"],[13],[1,\" will be accessed using the key \"],[10,\"code\"],[12],[1,\"commerce.cart.title\"],[13],[1,\", instead the key \"],[10,\"code\"],[12],[1,\"title\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,\"blockquote\"],[14,0,\"docs-md__blockquote\"],[12],[10,2],[12],[1,\"White spaces can be used in the names of the subdirectories.\\nThey will be converted to underscores when used as namespaces of the keys.\\n\"],[10,\"code\"],[12],[1,\"<root>/translations/foo bar\"],[13],[1,\" will be converted to \"],[10,\"code\"],[12],[1,\"foo_bar\"],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,\"h2\"],[14,1,\"translate\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#translate\"],[14,0,\"heading-anchor\"],[12],[1,\"Translate\"],[13],[13],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"<\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"h1\"],[13],[1,\">\"],[13],[1,\"\\n  \"],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"my_route.page_title\\\"\"],[13],[1,\"}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[1,\"\\n\"],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"</\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"h1\"],[13],[1,\">\"],[13],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"html-element-attributes\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#html-element-attributes\"],[14,0,\"heading-anchor\"],[12],[1,\"HTML Element Attributes\"],[13],[13],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"<\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"input\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"placeholder\"],[13],[1,\"=\"],[13],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"fields.email.placeholder\\\"\"],[13],[1,\"}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"type\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"email\\\"\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"value\"],[13],[1,\"=\"],[13],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"this.email\"],[13],[1,\"}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"\\n>\"],[13],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"helper-component-attributes\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#helper-component-attributes\"],[14,0,\"heading-anchor\"],[12],[1,\"Helper/Component Attributes\"],[13],[13],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"<\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"Input\"],[13],[1,\"\\n  @\"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"placeholder\"],[13],[1,\"=\"],[13],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"fields.email.placeholder\\\"\"],[13],[1,\"}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"\\n  @\"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"type\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"email\\\"\"],[13],[1,\"\\n  @\"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"value\"],[13],[1,\"=\"],[13],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"this.email\"],[13],[1,\"}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[10,1],[14,0,\"hljs-tag\"],[12],[1,\"\\n/>\"],[13],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"fallback-translation\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#fallback-translation\"],[14,0,\"heading-anchor\"],[12],[1,\"Fallback Translation\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" helper supports a fallback lookup if the intended translation key is missing.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"In the below example, if the translation for \"],[10,\"code\"],[12],[1,\"\\\"a_key_that_is_missing\\\"\"],[13],[1,\" was missing then the translation key \"],[10,\"code\"],[12],[1,\"\\\"errors.graceful_missing_translation\\\"\"],[13],[1,\" would be looked up and used in its place.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"a_key_that_is_missing\\\"\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"default\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"errors.graceful_missing_translation\\\"\"],[13],[1,\"}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"t\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'a_key_that_is_missing'\"],[13],[1,\", {\\n  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"/* Note: default can also be a string[], they'll be tried in order */\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"default\"],[13],[1,\": [\\n    \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'errors.graceful_missing_translation_one'\"],[13],[1,\",\\n    \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'errors.graceful_missing_translation_two'\"],[13],[1,\"\\n  ]\\n});\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"computed-property-macros\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#computed-property-macros\"],[14,0,\"heading-anchor\"],[12],[1,\"Computed Property Macros\"],[13],[13],[1,\"\\n    \\n      \"],[10,\"h3\"],[14,1,\"t\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#t\"],[14,0,\"heading-anchor\"],[12],[1,\"t\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" is a computed property macro that makes it easy to define translated\\ncomputed properties. For example:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Component\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/component'\"],[13],[1,\":\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { t } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Component\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"extend\"],[13],[1,\"({\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"followersCount\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-number\"],[12],[1,\"1\"],[13],[1,\",\\n\\n  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// A simple translation.\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"title\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"t\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'user.edit.title'\"],[13],[1,\"),\\n\\n  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// A translation with interpolations. This computed property\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// depends on `count` and will send `{ count: this.followersCount }`\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// in to the translation.\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"followersTitle\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"t\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'user.followers.title'\"],[13],[1,\", {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"count\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'followersCount'\"],[13],[1,\"\\n  })\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"The first argument is the translation key. The second is a hash where the keys\\nare interpolations in the translation and the values are paths to the values\\nrelative to this.\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"If you want to pass static values instead of paths to dynamic value, you can use\\nthe \"],[10,\"code\"],[12],[1,\"raw\"],[13],[1,\" function like in\\n\"],[10,3],[14,6,\"https://github.com/kellyselden/ember-macro-helpers#raw\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"ember-macro-helpers\"],[13],[13],[1,\".\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Component\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/component'\"],[13],[1,\":\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { raw, t } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Component\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"extend\"],[13],[1,\"({\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"userName\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Tom'\"],[13],[1,\",\\n\\n  \"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"// A translation with dynamic and static values\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"title\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"t\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'user.edit.title'\"],[13],[1,\", {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"brand\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"raw\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Ember'\"],[13],[1,\"),\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"name\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'userName'\"],[13],[1,\"\\n  })\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Note: Even though \"],[10,\"code\"],[12],[1,\"raw\"],[13],[1,\" is \"],[10,\"em\"],[12],[1,\"named\"],[13],[1,\" the same as in \"],[10,\"code\"],[12],[1,\"ember-awesome-macros\"],[13],[1,\" /\\n\"],[10,\"code\"],[12],[1,\"ember-macro-helpers\"],[13],[1,\", they \"],[10,\"em\"],[12],[1,\"are not\"],[13],[1,\" the same. Be sure to always use the\\ncorrect \"],[10,\"code\"],[12],[1,\"raw\"],[13],[1,\" with \"],[10,\"code\"],[12],[1,\"ember-intl\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"ember-awesome-macros\"],[13],[1,\" / \"],[10,\"code\"],[12],[1,\"ember-macro-helpers\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"intl\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#intl\"],[14,0,\"heading-anchor\"],[12],[1,\"intl\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\" is the underlying computed property macro for \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" and you can use it\\ndirectly to access other methods from the \"],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\" service. It looks like this:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Component\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/component'\"],[13],[1,\":\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { intl } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'ember-intl'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Component\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"extend\"],[13],[1,\"({\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"dateFormat\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'hhmmss'\"],[13],[1,\",\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"now\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"new\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Date\"],[13],[1,\"(),\\n\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"nowFormatted\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"intl\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'now'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'dateFormat'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"function\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"intl\"],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"/*, propertyKey, instance */\"],[13],[13],[1,\") {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" intl.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"formatDate\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"now\"],[13],[1,\", {\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"format\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"format\"],[13],[1,\"\\n    });\\n  })\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\" expects a list of dependent keys, which may be empty, and the computed\\nproperty getter method as the last argument. The getter method receives three\\narguments:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,2],[12],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\": The \"],[10,\"code\"],[12],[1,\"intl\"],[13],[1,\" service.\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,2],[12],[10,\"code\"],[12],[1,\"propertyKey\"],[13],[1,\": The name of the computed property. In the above example it\\nwould be \"],[10,\"code\"],[12],[1,\"nowFormatted\"],[13],[1,\".\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,2],[12],[10,\"code\"],[12],[1,\"instance\"],[13],[1,\": The class instance the computed property is installed on. This is\\nequivalent to \"],[10,\"code\"],[12],[1,\"this\"],[13],[1,\" in the above example. The reason \"],[10,\"code\"],[12],[1,\"instance\"],[13],[1,\" is also\\npassed to the getter method is to allow terser arrow function syntax instead\\nof the \"],[10,\"code\"],[12],[1,\"function\"],[13],[1,\" keyword:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"intl\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'now'\"],[13],[1,\", \"],[10,1],[14,0,\"hljs-function\"],[12],[1,\"(\"],[10,1],[14,0,\"hljs-params\"],[12],[1,\"intl, key, instance\"],[13],[1,\") =>\"],[13],[1,\" intl.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"formatDate\"],[13],[1,\"(instance.\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"now\"],[13],[1,\", { \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"format\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'hhmmss'\"],[13],[1,\" }));\\n\"],[13],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/guide/translating-text.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/helpers/format-date", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "adKy4U9V",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n\"],[10,2],[12],[8,[39,0],null,null,null],[13],[1,\"\\n\\n      \"],[10,\"h1\"],[14,1,\"format-date\"],[14,0,\"docs-md__h1\"],[12],[1,\"Format Date\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Formats dates using \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"Intl.DateTimeFormat\"],[13],[13],[1,\" and returns the formatted value as a string. (Try switching the locale by clicking on the toolbar buttons above!)\"],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,1],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"example\"]],null,[[\"@name\"],[\"docs__helpers__format-date__example-1\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Today: \"],[1,[28,[35,2],[[30,0,[\"today\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Yesterday: \"],[1,[28,[35,2],[[30,0,[\"yesterday\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.hbs\",\"docs__helpers__format-date__example-1__my-component.hbs\"]],null],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.js\",\"docs__helpers__format-date__example-1__my-component.js\"]],null],[1,\"\\n\"]],[1]]]]],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"format-date-time-options\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#format-date-time-options\"],[14,0,\"heading-anchor\"],[12],[1,\"Format Date & Time Options\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"For a complete, up-to-date list, please check \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"MDN\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"localematcher\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#localematcher\"],[14,0,\"heading-anchor\"],[12],[1,\"localeMatcher\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The locale matching algorithm to use. Possible values are \"],[10,\"code\"],[12],[1,\"\\\"lookup\\\"\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"\\\"best fit\\\"\"],[13],[1,\"; the default is \"],[10,\"code\"],[12],[1,\"\\\"best fit\\\"\"],[13],[1,\". For information about this option, see the \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl\"],[13],[1,\" page.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"timezone\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#timezone\"],[14,0,\"heading-anchor\"],[12],[1,\"timeZone\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The time zone to use. The only value implementations must recognize is \"],[10,\"code\"],[12],[1,\"\\\"UTC\\\"\"],[13],[1,\"; the default is the runtime's default time zone. Implementations may also recognize the time zone names of the \"],[10,3],[14,6,\"https://www.iana.org/time-zones\"],[14,0,\"docs-md__a\"],[12],[1,\"IANA time zone database\"],[13],[1,\", such as \"],[10,\"code\"],[12],[1,\"\\\"Asia/Shanghai\\\"\"],[13],[1,\", \"],[10,\"code\"],[12],[1,\"\\\"Asia/Kolkata\\\"\"],[13],[1,\", \"],[10,\"code\"],[12],[1,\"\\\"America/New_York\\\"\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"hour12\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#hour12\"],[14,0,\"heading-anchor\"],[12],[1,\"hour12\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Whether to use 12-hour time (as opposed to 24-hour time). Possible values are \"],[10,\"code\"],[12],[1,\"true\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"false\"],[13],[1,\"; the default is locale dependent. This option overrides the \"],[10,\"code\"],[12],[1,\"hc\"],[13],[1,\" language tag and/or the \"],[10,\"code\"],[12],[1,\"hourCycle\"],[13],[1,\" option in case both are present.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"formatmatcher\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#formatmatcher\"],[14,0,\"heading-anchor\"],[12],[1,\"formatMatcher\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The format matching algorithm to use. Possible values are \"],[10,\"code\"],[12],[1,\"\\\"basic\\\"\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"\\\"best fit\\\"\"],[13],[1,\"; the default is \"],[10,\"code\"],[12],[1,\"\\\"best fit\\\"\"],[13],[1,\". See the following paragraphs for information about the use of this property.\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"weekday\"],[13],[1,\": The representation of the weekday. Possible values are \\\"narrow\\\", \\\"short\\\", \\\"long\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"era\"],[13],[1,\": The representation of the era. Possible values are \\\"narrow\\\", \\\"short\\\", \\\"long\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"year\"],[13],[1,\": The representation of the year. Possible values are \\\"numeric\\\", \\\"2-digit\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"month\"],[13],[1,\": The representation of the month. Possible values are \\\"numeric\\\", \\\"2-digit\\\", \\\"narrow\\\", \\\"short\\\", \\\"long\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"day\"],[13],[1,\": The representation of the day. Possible values are \\\"numeric\\\", \\\"2-digit\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"hour\"],[13],[1,\": The representation of the hour. Possible values are \\\"numeric\\\", \\\"2-digit\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"minute\"],[13],[1,\": The representation of the minute. Possible values are \\\"numeric\\\", \\\"2-digit\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"second\"],[13],[1,\": The representation of the second. Possible values are \\\"numeric\\\", \\\"2-digit\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"timeZoneName\"],[13],[1,\": The representation of the time zone name. Possible values are \\\"short\\\", \\\"long\\\".\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"hourCycle\"],[13],[1,\" The hour cycle to use. Possible values are \\\"h11\\\", \\\"h12\\\", \\\"h23\\\", or \\\"h24\\\". This option overrides the hc language tag, if both are present, and the hour12 option takes precedence in case both options have been specified.\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h2\"],[14,1,\"custom-format\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#custom-format\"],[14,0,\"heading-anchor\"],[12],[1,\"Custom format\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"You can create a custom format configuration in \"],[10,\"code\"],[12],[1,\"app/formats.js\"],[13],[1,\", and provide its key as \"],[10,\"code\"],[12],[1,\"format\"],[13],[1,\" named argument's value.\"],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,1],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,2,[\"example\"]],null,[[\"@name\"],[\"docs__helpers__format-date__example-2\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Time: \"],[1,[28,[35,2],[[30,0,[\"today\"]]],[[\"format\"],[\"hhmmss\"]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[30,2,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.hbs\",\"docs__helpers__format-date__example-2__my-component.hbs\"]],null],[1,\"\\n\\n  \"],[8,[30,2,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.js\",\"docs__helpers__format-date__example-2__my-component.js\"]],null],[1,\"\\n\\n  \"],[8,[30,2,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"app/format.js\",\"docs__helpers__format-date__example-2__app__format.js\"]],null],[1,\"\\n\"]],[2]]]]],[13],[1,\"\\n\"],[13]],[\"demo\",\"demo\"],false,[\"locale-switcher\",\"docs-demo\",\"format-date\"]]",
    "moduleName": "dummy/templates/docs/helpers/format-date.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/helpers/format-list", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "y4DZYB3y",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n\"],[10,2],[12],[8,[39,0],null,null,null],[13],[1,\"\\n\\n      \"],[10,\"h1\"],[14,1,\"format-list\"],[14,0,\"docs-md__h1\"],[12],[1,\"Format List\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Uses \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"Intl.ListFormat\"],[13],[13],[1,\" to join an array of strings into a single value.\"],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,1],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"example\"]],null,[[\"@name\"],[\"docs__helpers__format-number__example-1\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Conjunction: \"],[1,[28,[35,2],[[30,0,[\"fruits\"]]],[[\"type\"],[\"conjunction\"]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Disjunction: \"],[1,[28,[35,2],[[30,0,[\"fruits\"]]],[[\"type\"],[\"disjunction\"]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.hbs\",\"docs__helpers__format-list__example-1__my-component.hbs\"]],null],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.js\",\"docs__helpers__format-list__example-1__my-component.js\"]],null],[1,\"\\n\"]],[1]]]]],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"format-list-options\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#format-list-options\"],[14,0,\"heading-anchor\"],[12],[1,\"Format List Options\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"For a complete, up-to-date list, please check \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"MDN\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"localematcher\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#localematcher\"],[14,0,\"heading-anchor\"],[12],[1,\"localeMatcher\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The locale-matching algorithm to use. Possible values:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"best fit\\\"\"],[13],[1,\" (default)\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"lookup\\\"\"],[13],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"For information about this option, see the \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl\"],[13],[1,\" page.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"type\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#type\"],[14,0,\"heading-anchor\"],[12],[1,\"type\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Indicates the type of grouping. Possible values:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"conjunction\\\"\"],[13],[1,\", for \\\"and\\\"-based grouping of the list items: \\\"A, B, and C\\\" (default)\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"disjunction\\\"\"],[13],[1,\", for \\\"or\\\"-based grouping of the list items: \\\"A, B, or C\\\"\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"unit\\\"\"],[13],[1,\", for grouping the list items as a unit (neither \\\"and\\\"-based nor \\\"or\\\"-based): \\\"A, B, C\\\" (e.g., \\\"5 pounds, 12 ounces\\\")\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h3\"],[14,1,\"style\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#style\"],[14,0,\"heading-anchor\"],[12],[1,\"style\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Indicates the grouping style (for example, whether list separators and conjunctions are included). Possible values:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"long\\\"\"],[13],[1,\": \\\"A, B, and C\\\" (default)\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"short\\\"\"],[13],[1,\": \\\"A, B, C\\\"\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"narrow\\\"\"],[13],[1,\": \\\"A B C\\\"\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[13]],[\"demo\"],false,[\"locale-switcher\",\"docs-demo\",\"format-list\"]]",
    "moduleName": "dummy/templates/docs/helpers/format-list.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/helpers/format-message", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "ajaMyeGU",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n\"],[10,2],[12],[8,[39,0],null,null,null],[13],[1,\"\\n\\n      \"],[10,\"h1\"],[14,1,\"format-message\"],[14,0,\"docs-md__h1\"],[12],[1,\"Format Message\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Formats \"],[10,3],[14,6,\"https://formatjs.io/docs/core-concepts/icu-syntax\"],[14,0,\"docs-md__a\"],[12],[1,\"ICU message syntax\"],[13],[1,\" strings with the provided values passed as arguments to the helper/method.\"],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,1],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"example\"]],null,[[\"@name\"],[\"docs__helpers__format-message__example-1\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[12],[1,\"\\n      \"],[1,[28,[35,2],[[30,0,[\"customMessage\"]]],[[\"name\",\"numPhotos\",\"timestamp\"],[\"Sonja\",12,[30,0,[\"yesterday\"]]]]]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[12],[1,\"\\n      \"],[1,[28,[35,2],[[30,0,[\"customMessage\"]]],[[\"name\",\"numPhotos\",\"timestamp\"],[\"Chris\",0,[30,0,[\"yesterday\"]]]]]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[12],[1,\"\\n      \"],[1,[28,[35,2],[[30,0,[\"customMessage\"]]],[[\"name\",\"numPhotos\",\"timestamp\"],[\"Maki\",1,[30,0,[\"today\"]]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.hbs\",\"docs__helpers__format-message__example-1__my-component.hbs\"]],null],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.js\",\"docs__helpers__format-message__example-1__my-component.js\"]],null],[1,\"\\n\"]],[1]]]]],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"format-html-message\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#format-html-message\"],[14,0,\"heading-anchor\"],[12],[1,\"Format HTML Message\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"To enable rendering HTML within translations, pass an \"],[10,\"code\"],[12],[1,\"htmlSafe\"],[13],[1,\" attribute to the \"],[10,\"code\"],[12],[1,\"format-message\"],[13],[1,\" helper.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"format-message\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"'<em>'{numPhotos, number}'</em>'\\\"\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"htmlSafe\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"numPhotos\"],[13],[1,\"=@photos.length\\n}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"It will escape all hash arguments and returns as an htmlSafe String which renders an ElementNode.  \"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"service-api\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#service-api\"],[14,0,\"heading-anchor\"],[12],[1,\"Service API\"],[13],[13],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { service } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/service'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Component\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@glimmer/component'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { tracked } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@glimmer/tracking'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"class\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"MyComponent\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"extends\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_ inherited__\"],[12],[1,\"Component\"],[13],[1,\" {\\n  @service intl;\\n\\n  customMessage = \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'You took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.'\"],[13],[1,\";\\n\\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"get\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"message\"],[13],[1,\"() {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"const\"],[13],[1,\" photos = \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"args\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"photos\"],[13],[1,\" ?? [];\\n\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"formatMessage\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"customMessage\"],[13],[1,\", {\\n      \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"numPhotos\"],[13],[1,\": photos.\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"length\"],[13],[1,\"\\n    });\\n  }\\n}\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Visit the page \"],[8,[39,3],null,[[\"@route\"],[\"docs.guide.service-api\"]],[[\"default\"],[[[[1,\"Service API\"]],[]]]]],[1,\" to learn more.\"],[13],[1,\"\\n\"],[13]],[\"demo\"],false,[\"locale-switcher\",\"docs-demo\",\"format-message\",\"docs-link\"]]",
    "moduleName": "dummy/templates/docs/helpers/format-message.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/helpers/format-number", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "nQfQE123",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n\"],[10,2],[12],[8,[39,0],null,null,null],[13],[1,\"\\n\\n      \"],[10,\"h1\"],[14,1,\"format-number\"],[14,0,\"docs-md__h1\"],[12],[1,\"Format Number\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Formats numbers using \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"Intl.NumberFormat\"],[13],[13],[1,\" and returns the formatted value as a string.\"],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,1],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"example\"]],null,[[\"@name\"],[\"docs__helpers__format-number__example-1\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[12],[1,\"\\n      As number: \"],[1,[28,[35,2],[1000],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      As currency: \"],[1,[28,[35,2],[1000],[[\"currency\",\"style\"],[\"USD\",\"currency\"]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.hbs\",\"docs__helpers__format-number__example-1__my-component.hbs\"]],null],[1,\"\\n\"]],[1]]]]],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"format-number-options\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#format-number-options\"],[14,0,\"heading-anchor\"],[12],[1,\"Format Number Options\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"For a complete, up-to-date list, please check \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"MDN\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"localematcher\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#localematcher\"],[14,0,\"heading-anchor\"],[12],[1,\"localeMatcher\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The locale matching algorithm to use. Possible values are \"],[10,\"code\"],[12],[1,\"\\\"lookup\\\"\"],[13],[1,\" and \"],[10,\"code\"],[12],[1,\"\\\"best fit\\\"\"],[13],[1,\"; the default is \"],[10,\"code\"],[12],[1,\"\\\"best fit\\\"\"],[13],[1,\". For information about this option, see the \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl\"],[13],[1,\" page.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"style\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#style\"],[14,0,\"heading-anchor\"],[12],[1,\"style\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The formatting style to use. The default is \"],[10,\"code\"],[12],[1,\"\\\"decimal\\\"\"],[13],[1,\".\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"decimal\\\"\"],[13],[1,\" for plain number formatting.\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"currency\\\"\"],[13],[1,\" for currency formatting.\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"percent\\\"\"],[13],[1,\" for percent formatting\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"unit\\\"\"],[13],[1,\" for unit formatting\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h3\"],[14,1,\"currency\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#currency\"],[14,0,\"heading-anchor\"],[12],[1,\"currency\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as \"],[10,\"code\"],[12],[1,\"\\\"USD\\\"\"],[13],[1,\" for the US dollar, \"],[10,\"code\"],[12],[1,\"\\\"EUR\\\"\"],[13],[1,\" for the euro, or \"],[10,\"code\"],[12],[1,\"\\\"CNY\\\"\"],[13],[1,\" for the Chinese RMB — see the \"],[10,3],[14,6,\"https://www.six-group.com/en/products-services/financial-information/data-standards.html#scrollTo=currency-codes\"],[14,0,\"docs-md__a\"],[12],[1,\"Current currency & funds code list\"],[13],[1,\". There is no default value; if the style is \"],[10,\"code\"],[12],[1,\"\\\"currency\\\"\"],[13],[1,\", the currency property must be provided.\"],[13],[1,\"\\n\"],[13]],[\"demo\"],false,[\"locale-switcher\",\"docs-demo\",\"format-number\"]]",
    "moduleName": "dummy/templates/docs/helpers/format-number.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/helpers/format-relative", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "UXtoQZEP",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n\"],[10,2],[12],[8,[39,0],null,null,null],[13],[1,\"\\n\\n      \"],[10,\"h1\"],[14,1,\"format-relative\"],[14,0,\"docs-md__h1\"],[12],[1,\"Format Relative\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Formats dates relative to \\\"now\\\" using \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl.RelativeTimeFormat\"],[13],[1,\" and returns the formatted value as a string.\"],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,1],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"example\"]],null,[[\"@name\"],[\"docs__helpers__format-relative__example-1\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Past: \"],[1,[28,[35,2],[-1],[[\"unit\"],[\"month\"]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Current: \"],[1,[28,[35,2],[0],[[\"unit\"],[\"day\"]]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Future: \"],[1,[28,[35,2],[3],[[\"unit\"],[\"week\"]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.hbs\",\"docs__helpers__format-relative__example-1__my-component.hbs\"]],null],[1,\"\\n\"]],[1]]]]],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"format-relative-options\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#format-relative-options\"],[14,0,\"heading-anchor\"],[12],[1,\"Format Relative Options\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"For a complete, up-to-date list, please check \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat\"],[14,0,\"docs-md__a\"],[12],[1,\"MDN\"],[13],[1,\".\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"localematcher\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#localematcher\"],[14,0,\"heading-anchor\"],[12],[1,\"localeMatcher\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The locale matching algorithm to use. Possible values are \\\"lookup\\\" and \\\"best fit\\\"; the default is \\\"best fit\\\". For information about this option, see the \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation\"],[14,0,\"docs-md__a\"],[12],[1,\"Intl\"],[13],[1,\" page.\"],[13],[1,\"\\n\\n      \"],[10,\"h3\"],[14,1,\"numeric\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#numeric\"],[14,0,\"heading-anchor\"],[12],[1,\"numeric\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The format of output message. Possible values are:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"always\\\"\"],[13],[1,\" (default, e.g., 1 day ago)\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"auto\\\"\"],[13],[1,\" (e.g., yesterday). The \\\"auto\\\" value allows to not always have to use numeric values in the output.\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h3\"],[14,1,\"style\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#style\"],[14,0,\"heading-anchor\"],[12],[1,\"style\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The length of the internationalized message. Possible values are:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"long\\\"\"],[13],[1,\" (default, e.g., in 1 month)\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"short\\\"\"],[13],[1,\" (e.g., in 1 mo.),\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"narrow\\\"\"],[13],[1,\" (e.g., in 1 mo.). The narrow style could be similar to the short style for some locales.\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h3\"],[14,1,\"unit\"],[14,0,\"docs-md__h3\"],[12],[10,3],[14,6,\"#unit\"],[14,0,\"heading-anchor\"],[12],[1,\"unit\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Unit to use in the relative time internationalized message. According to \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format\"],[14,0,\"docs-md__a\"],[12],[1,\"MDN\"],[13],[1,\", the possible values are:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"year\\\"\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"quarter\\\"\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"month\\\"\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"week\\\"\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"day\\\"\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"hour\\\"\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"minute\\\"\"],[13],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"\\\"second\\\"\"],[13],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"Plural forms are also permitted.\"],[13],[1,\"\\n\"],[13]],[\"demo\"],false,[\"locale-switcher\",\"docs-demo\",\"format-relative\"]]",
    "moduleName": "dummy/templates/docs/helpers/format-relative.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/helpers/format-time", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "7o4jZSAM",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n\"],[10,2],[12],[8,[39,0],null,null,null],[13],[1,\"\\n\\n      \"],[10,\"h1\"],[14,1,\"format-time\"],[14,0,\"docs-md__h1\"],[12],[1,\"Format Time\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"This helper behaves like the \"],[10,\"code\"],[12],[1,\"{{format-date}}\"],[13],[1,\" helper, except its format comes from \"],[10,\"code\"],[12],[1,\"formats.time\"],[13],[1,\".\"],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,1],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"example\"]],null,[[\"@name\"],[\"docs__helpers__format-time__example-1\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[12],[1,\"\\n      Time: \"],[1,[28,[35,2],[[30,0,[\"today\"]]],[[\"format\"],[\"hhmmss\"]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.hbs\",\"docs__helpers__format-time__example-1__my-component.hbs\"]],null],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.js\",\"docs__helpers__format-time__example-1__my-component.js\"]],null],[1,\"\\n\"]],[1]]]]],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"custom-format\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#custom-format\"],[14,0,\"heading-anchor\"],[12],[1,\"Custom format\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Visit \"],[8,[39,3],null,[[\"@route\"],[\"docs.helpers.format-date\"]],[[\"default\"],[[[[1,\"Format Date\"]],[]]]]],[1,\" to learn more. (See the section \\\"Custom format.\\\")\"],[13],[1,\"\\n\"],[13]],[\"demo\"],false,[\"locale-switcher\",\"docs-demo\",\"format-time\",\"docs-link\"]]",
    "moduleName": "dummy/templates/docs/helpers/format-time.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/helpers/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "S582YHEZ",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"ember-intl-template-helpers\"],[14,0,\"docs-md__h1\"],[12],[1,\"Ember Intl Template Helpers\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Ember-intl provide several template helpers for formatting and translating.\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"helper-options\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#helper-options\"],[14,0,\"heading-anchor\"],[12],[1,\"Helper Options\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"All helpers accept optional arguments:\"],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"locale\"],[13],[1,\" argument to explicitly pass/override the application locale\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"format\"],[13],[1,\" argument which you pass in a key corresponding to a format configuration in \"],[10,\"code\"],[12],[1,\"app/formats.js\"],[13],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/helpers/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/helpers/t", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "66y0bFgU",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n\"],[10,2],[12],[8,[39,0],null,null,null],[13],[1,\"\\n\\n      \"],[10,\"h1\"],[14,1,\"the-t-helper\"],[14,0,\"docs-md__h1\"],[12],[1,\"The \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" Helper\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"The \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" helper accepts a translation key and returns a translated string.\\nTo provide values to the dynamic segment of the translation, pass an object hash.\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"icu-message-syntax\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#icu-message-syntax\"],[14,0,\"heading-anchor\"],[12],[1,\"ICU Message Syntax\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Compiles an \"],[10,3],[14,6,\"https://formatjs.io/docs/core-concepts/icu-syntax\"],[14,0,\"docs-md__a\"],[12],[1,\"ICU message syntax\"],[13],[1,\" strings with its hash values passed.\"],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,1],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[30,1,[\"example\"]],null,[[\"@name\"],[\"docs__helpers__t__example-1\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"toolbar\"],[12],[1,\"\\n      \"],[11,\"button\"],[24,0,\"button\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"addPhoto\"]]],null],[12],[1,\"\\n        Add photo\\n      \"],[13],[1,\"\\n\\n      \"],[11,\"button\"],[24,0,\"button\"],[24,4,\"button\"],[4,[38,2],[\"click\",[30,0,[\"deletePhoto\"]]],null],[12],[1,\"\\n        Delete photo\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[12],[1,\"\\n      Message: \"],[1,[28,[35,3],[\"photos.banner\"],[[\"numPhotos\"],[[30,0,[\"numPhotos\"]]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.hbs\",\"docs__helpers__t__example-1__my-component.hbs\"]],null],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"my-component.js\",\"docs__helpers__t__example-1__my-component.js\"]],null],[1,\"\\n\\n  \"],[8,[30,1,[\"snippet\"]],null,[[\"@label\",\"@name\"],[\"translations/en-us.yaml\",\"docs__helpers__t__example-1__translations__en-us.yaml\"]],null],[1,\"\\n\"]],[1]]]]],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"named-and-positional-arguments\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#named-and-positional-arguments\"],[14,0,\"heading-anchor\"],[12],[1,\"Named and Positional Arguments\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Options may be passed to the \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" helper as either named or positional arguments. The following examples are equivalent:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"{{!-- With named arguments --}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[1,\"\\n\"],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"photos.banner\\\"\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"numPhotos\"],[13],[1,\"=this.numPhotos}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-comment\"],[12],[1,\"{{!-- With positional arguments --}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[1,\"\\n\"],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"photos.banner\\\"\"],[13],[1,\" (\"],[10,1],[14,0,\"hljs-name\"],[12],[10,1],[14,0,\"hljs-built_in\"],[12],[1,\"hash\"],[13],[13],[1,\" \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"numPhotos\"],[13],[1,\"=this.numPhotos)}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"When both named and positional arguments are used, they'll be merged together and named arguments will take precedence over the properties of duplicate positional arguments.\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"format-html-message\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#format-html-message\"],[14,0,\"heading-anchor\"],[12],[1,\"Format HTML Message\"],[13],[13],[1,\"\\n    \"],[10,2],[12],[1,\"To enable rendering HTML within translations, pass an \"],[10,\"code\"],[12],[1,\"htmlSafe\"],[13],[1,\" attribute to the \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" helper.\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"call-to-action\\\"\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"htmlSafe\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-yaml\"],[12],[1,\"# translations/en-us.yaml\\ncall-to-action: Visit <a href=\\\"https://www.emberjs.com\\\">Ember.js website</a>.\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"It will escape all hash arguments and returns as an \"],[10,\"code\"],[12],[1,\"htmlSafe\"],[13],[1,\" String which renders an ElementNode.\\n\"],[10,\"em\"],[12],[1,\"Do not\"],[13],[1,\" use \"],[10,\"code\"],[12],[1,\"{{{triple-curlies}}}\"],[13],[1,\"! This would enable XSS for variables passed\\nto \"],[10,\"code\"],[12],[1,\"{{t}}\"],[13],[1,\".\"],[13],[1,\"\\n\"],[10,2],[12],[1,\"If you use placeholders \"],[10,\"em\"],[12],[1,\"inside\"],[13],[1,\" of an HTML tag for attributes, escape only the\\nangle brackets, like so:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-yaml\"],[12],[1,\"# translations/en-en.yml\\nlegal:\\n  accept-terms: Please accept our '<'a href=\\\"{url}\\\"'>'terms & conditions'</a>'.\\n\"],[13],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"service-api\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#service-api\"],[14,0,\"heading-anchor\"],[12],[1,\"Service API\"],[13],[13],[1,\"\\n    \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"Controller\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/controller'\"],[13],[1,\";\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"import\"],[13],[1,\" { service } \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"from\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'@ember/service'\"],[13],[1,\";\\n\\n\"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"export\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"default\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"class\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_\"],[12],[1,\"MyController\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"extends\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title class_ inherited__\"],[12],[1,\"Controller\"],[13],[1,\" {\\n  @service intl;\\n\\n  \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"get\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"photosBanner\"],[13],[1,\"() {\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"const\"],[13],[1,\" numPhotos = \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"model\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"photos\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"length\"],[13],[1,\";\\n\\n    \"],[10,1],[14,0,\"hljs-keyword\"],[12],[1,\"return\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-variable language_\"],[12],[1,\"this\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-property\"],[12],[1,\"intl\"],[13],[1,\".\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"t\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'photos.banner'\"],[13],[1,\", { numPhotos });\\n  }\\n}\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"Visit the page \"],[8,[39,4],null,[[\"@route\"],[\"docs.guide.service-api\"]],[[\"default\"],[[[[1,\"Service API\"]],[]]]]],[1,\" to learn more.\"],[13],[1,\"\\n\"],[13]],[\"demo\"],false,[\"locale-switcher\",\"docs-demo\",\"on\",\"t\",\"docs-link\"]]",
    "moduleName": "dummy/templates/docs/helpers/t.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/integrations/ember-cp-validations", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "BudFLlP8",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"ember-cp-validations\"],[14,0,\"docs-md__h1\"],[12],[1,\"ember-cp-validations\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"To use translations in \"],[10,3],[14,6,\"https://github.com/offirgolan/ember-cp-validations\"],[14,0,\"docs-md__a\"],[12],[1,\"ember-cp-validations\"],[13],[1,\", consider using \"],[10,3],[14,6,\"https://github.com/jasonmit/ember-intl-cp-validations\"],[14,0,\"docs-md__a\"],[12],[1,\"ember-intl-cp-validations\"],[13],[1,\".\"],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/integrations/ember-cp-validations.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/integrations/visual-studio-code", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "PlGQGkvj",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"visual-studio-code\"],[14,0,\"docs-md__h1\"],[12],[1,\"Visual Studio Code\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"You can get autocomplete and additional information inside \"],[10,3],[14,6,\"https://code.visualstudio.com/\"],[14,0,\"docs-md__a\"],[12],[1,\"Visual Studio Code\"],[13],[1,\" by installing \"],[10,3],[14,6,\"https://github.com/lifeart/els-intl-addon\"],[14,0,\"docs-md__a\"],[12],[1,\"els-intl-addon\"],[13],[1,\" addon for \"],[10,3],[14,6,\"https://marketplace.visualstudio.com/items?itemName=lifeart.vscode-ember-unstable\"],[14,0,\"docs-md__a\"],[12],[1,\"Unstable Ember Language Server\"],[13],[1,\".\"],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/integrations/visual-studio-code.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/legacy/migration-2-0-to-3-0", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "mXI+qfGe",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"migrating-from-2-0-to-3-0\"],[14,0,\"docs-md__h1\"],[12],[1,\"Migrating from 2.0 to 3.0\"],[13],[1,\"\\n    \\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,2],[12],[10,\"code\"],[12],[1,\"baseLocale\"],[13],[1,\" was removed from \"],[10,\"code\"],[12],[1,\"config/ember-intl.js\"],[13],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,2],[12],[10,\"code\"],[12],[1,\"format-html-message\"],[13],[1,\" was removed in favor of passing \"],[10,\"code\"],[12],[1,\"htmlSafe=true\"],[13],[1,\" into the \"],[10,\"code\"],[12],[1,\"t\"],[13],[1,\" & \"],[10,\"code\"],[12],[1,\"format-message\"],[13],[1,\" API.\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"app.sale_begins\\\"\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"day\"],[13],[1,\"=this.day \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"htmlSafe\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"}}\"],[13],[10,1],[14,0,\"language-xml\"],[12],[1,\"\\n\\n\"],[13],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"format-html-message\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"Sale begins {day, date, shortWeekDay}\\\"\"],[13],[1,\"\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"day\"],[13],[1,\"=this.day\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"htmlSafe\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-literal\"],[12],[1,\"true\"],[13],[1,\"\\n}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,2],[12],[10,\"code\"],[12],[1,\"ember-intl-dot-notation\"],[13],[1,\" is no longer needed. Delete \"],[10,\"code\"],[12],[1,\"app/models/ember-intl-translation.js\"],[13],[1,\". Your application should continue to behave the same whether your keys are flat or nested objects.\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,2],[12],[10,\"code\"],[12],[1,\"intl.addTranslation\"],[13],[1,\" was removed in favor of using \"],[10,\"code\"],[12],[1,\"intl.addTranslations\"],[13],[1,\". \"],[10,\"code\"],[12],[1,\"addTranslations\"],[13],[1,\" takes a locale as the first argument and a object as the second.\"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,2],[12],[1,\"Example:\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[1,\"intl.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"addTranslations\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\", {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"hero\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Welcome to ember-intl 3.0'\"],[13],[1,\"\\n});\\n\"],[13],[13],[1,\"\\n\\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"fallback\"],[13],[1,\" was removed in favor of \"],[10,\"code\"],[12],[1,\"defaults\"],[13],[1,\". This is for better alignment with ember-i18n's API.\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"app.sale_begins\\\"\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"day\"],[13],[1,\"=this.day \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"fallback\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"Sale begins {day, date, shortWeekDay}\\\"\"],[13],[1,\"}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[10,2],[12],[1,\"becomes\"],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-js\"],[12],[1,\"intl.\"],[10,1],[14,0,\"hljs-title function_\"],[12],[1,\"addTranslations\"],[13],[1,\"(\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'en-us'\"],[13],[1,\", {\\n  \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"home\"],[13],[1,\": {\\n    \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"sale_begins\"],[13],[1,\": \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"'Sale begins {day, date, shortWeekDay}'\"],[13],[1,\"\\n  }\\n});\\n\"],[13],[13],[1,\"\\n\"],[10,\"pre\"],[14,0,\"docs-md__code\"],[12],[10,\"code\"],[14,0,\"language-hbs\"],[12],[10,1],[14,0,\"hljs-template-variable\"],[12],[1,\"{{\"],[10,1],[14,0,\"hljs-name\"],[12],[1,\"t\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"app.sale_begins\\\"\"],[13],[1,\" \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"day\"],[13],[1,\"=this.day \"],[10,1],[14,0,\"hljs-attr\"],[12],[1,\"defaults\"],[13],[1,\"=\"],[10,1],[14,0,\"hljs-string\"],[12],[1,\"\\\"home.sale_begins\\\"\"],[13],[1,\"}}\"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/legacy/migration-2-0-to-3-0.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/legacy/migration-3-0-to-4-0", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "R8hNhneS",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"migrating-from-3-0-to-4-0\"],[14,0,\"docs-md__h1\"],[12],[1,\"Migrating from 3.0 to 4.0\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"No migration necessary.\"],[13],[1,\"\\n\\n      \"],[10,\"h2\"],[14,1,\"breaking-change\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#breaking-change\"],[14,0,\"heading-anchor\"],[12],[1,\"Breaking Change\"],[13],[13],[1,\"\\n    \\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[1,\"CLDR locale data set has been updated from 28.0.0 to 34.0.0\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"Legacy instance initializer removed.  Only a breaking change if you reference it in another one of your initializers using \"],[10,\"code\"],[12],[1,\"before: 'ember-intl'\"],[13],[1,\" or \"],[10,\"code\"],[12],[1,\"after: 'ember-intl'\"],[13],[13],[1,\"\\n\"],[13],[1,\"\\n      \\n      \"],[10,\"h2\"],[14,1,\"enhancements\"],[14,0,\"docs-md__h2\"],[12],[10,3],[14,6,\"#enhancements\"],[14,0,\"heading-anchor\"],[12],[1,\"Enhancements\"],[13],[13],[1,\"\\n    \\n        \"],[10,\"ul\"],[14,0,\"docs-list-disc\"],[12],[10,\"li\"],[12],[1,\"Translation blueprint now adds translation relative to config \"],[10,\"code\"],[12],[1,\"inputPath\"],[13],[1,\" option\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[1,\"Relative time API now has \"],[10,3],[14,6,\"https://ember-intl.github.io/ember-intl/versions/v4.0.0/docs/helpers/format-relative#format-relative-options\"],[14,0,\"docs-md__a\"],[12],[10,\"code\"],[12],[1,\"short\"],[13],[13],[1,\" units\"],[13],[1,\"\\n\"],[10,\"li\"],[12],[10,\"code\"],[12],[1,\"baseLocale\"],[13],[1,\" API has returned as \"],[10,\"code\"],[12],[1,\"fallbackLocale\"],[13],[1,\". Enables merging the fallback locale's translations into all other locales as a build-time fallback strategy.\"],[13],[1,\"\\n\"],[13],[1,\"\\n      \"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/legacy/migration-3-0-to-4-0.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/docs/legacy/v2", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "qI8h9w2A",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n      \"],[10,\"h1\"],[14,1,\"documentation-for-2-x\"],[14,0,\"docs-md__h1\"],[12],[1,\"Documentation for 2.x\"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"Documentation is hosted in the GitHub repository within the \"],[10,3],[14,6,\"https://github.com/ember-intl/ember-intl/tree/2.x/docs\"],[14,0,\"docs-md__a\"],[12],[1,\"/docs\"],[13],[1,\" folder.\"],[13],[1,\"\\n\"],[13]],[],false,[]]",
    "moduleName": "dummy/templates/docs/legacy/v2.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "7JhO5Rfx",
    "block": "[[[10,0],[14,0,\"docs-md\"],[12],[1,\"\\n\"],[10,2],[12],[8,[39,0],null,[[\"@byline\",\"@logo\"],[\"🌐 Internationalize your Ember apps.\",\"ember\"]],null],[13],[1,\"\\n\\n\"],[10,2],[12],[10,0],[14,0,\"index-route container\"],[12],[1,\"\\n  \"],[10,0],[12],[1,\"\\n    \"],[10,\"h2\"],[14,0,\"section-title\"],[12],[1,\"\\n      Notable Features\\n    \"],[13],[1,\"\\n    \"],[10,\"ul\"],[12],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        💵 Locale-aware numbers. Formatting of currencies, decimals, and percentages.\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        📅 Locale-aware dates and times formatting\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        🕑 Locale-aware display of relative time. i.e, \"],[10,\"code\"],[12],[1,\"\\\"in 1 day\\\"\"],[13],[1,\", \"],[10,\"code\"],[12],[1,\"\\\"2 years ago\\\"\"],[13],[1,\", etc.\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        🌐 Support for 150+ languages.\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        📜 Built largely on standards. \"],[10,3],[14,6,\"https://formatjs.io/docs/core-concepts/icu-syntax\"],[12],[1,\"ICU message syntax\"],[13],[1,\" & \"],[10,3],[14,6,\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl\"],[12],[1,\"Native Intl API\"],[13],[1,\".\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        ⚡ Extensive Ember Service API and template helpers for formatting and translating.\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        🎉 \"],[8,[39,1],null,[[\"@route\"],[\"docs.advanced.addon-support\"]],[[\"default\"],[[[[1,\"Advanced addon support\"]],[]]]]],[1,\" to provide translations to the host app\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@route\"],[\"docs\"]],[[\"default\"],[[[[1,\"\\n      Read the docs\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[13],[1,\"\\n\"],[13]],[],false,[\"docs-hero\",\"docs-link\"]]",
    "moduleName": "dummy/templates/index.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/not-found", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "MbZfbhIO",
    "block": "[[[10,\"h1\"],[12],[1,\"404\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  This page does not exist. \"],[8,[39,0],null,[[\"@route\"],[\"index\"]],[[\"default\"],[[[[1,\"Head home?\"]],[]]]]],[1,\"\\n\"],[13]],[],false,[\"docs-link\"]]",
    "moduleName": "dummy/templates/not-found.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/smoke", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/template-factory"eaimeta@70e063a35619d71f

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "oIoUi/sE",
    "block": "[[[10,\"h1\"],[12],[1,\"Smoke\"],[13],[1,\"\\n\\n\"],[10,\"h2\"],[12],[1,\"Format Number\"],[13],[1,\"\\n\\n\"],[10,0],[14,\"data-test-field\",\"Format Number\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[1000],[[\"currency\",\"format\",\"style\"],[\"EUR\",\"currency\",\"currency\"]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\\n\"],[10,\"h2\"],[12],[1,\"Format Date\"],[13],[1,\"\\n\\n\"],[10,0],[14,\"data-test-field\",\"Format Date\"],[12],[1,\"\\n  \"],[1,[28,[35,1],[\"Thu Jan 23 2014 18:00:44 GMT+0000 (GMT)\"],[[\"timeZone\"],[\"UTC\"]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\\n\"],[10,\"h2\"],[12],[1,\"Format Time\"],[13],[1,\"\\n\\n\"],[10,0],[14,\"data-test-field\",\"Format Time\"],[12],[1,\"\\n  \"],[1,[28,[35,2],[\"Thu Jan 23 2014 18:00:44 GMT+0000 (GMT)\"],[[\"hour\",\"hour12\",\"minute\",\"second\",\"timeZone\"],[\"numeric\",false,\"numeric\",\"numeric\",\"UTC\"]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\\n\"],[10,\"h2\"],[12],[1,\"Format Relative\"],[13],[1,\"\\n\\n\"],[10,0],[14,\"data-test-field\",\"Format Relative\"],[12],[1,\"\\n  \"],[1,[28,[35,3],[1],[[\"unit\"],[\"day\"]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\\n\"],[10,\"h2\"],[12],[1,\"Nested Translations\"],[13],[1,\"\\n\\n\"],[10,0],[14,\"data-test-field\",\"Nested Translations\"],[12],[1,\"\\n\"],[41,[30,0,[\"areNestedTranslationsWorking\"]],[[[1,\"    Working\\n\"]],[]],[[[1,\"    Not working\\n\"]],[]]],[13]],[],false,[\"format-number\",\"format-date\",\"format-time\",\"format-relative\",\"if\"]]",
    "moduleName": "dummy/templates/smoke.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
});
;define("dummy/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
});
;define("dummy/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
});
;define("dummy/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"@ember-data/serializer/-private"eaimeta@70e063a35619d71f
});
;define("dummy/utils/intl/missing-message", ["exports", "ember-intl/-private/utils/missing-message"], function (_exports, _missingMessage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _missingMessage.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-intl/-private/utils/missing-message"eaimeta@70e063a35619d71f
});
;define("dummy/utils/titleize", ["exports", "ember-cli-string-helpers/utils/titleize"], function (_exports, _titleize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _titleize.default;
    }
  });
  0; //eaimeta@70e063a35619d71f0,"ember-cli-string-helpers/utils/titleize"eaimeta@70e063a35619d71f
});
;

;define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("dummy/app")["default"].create({});
          }
        
