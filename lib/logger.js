module.exports = class Logger {
  constructor(options = {}) {
    this.options = options;
    this.ui = options.ui;
  }

  log(msg) {
    if (this.options.silent) {
      return;
    }

    return this.ui.writeLine(`[ember-intl] ${msg}`);
  }

  warn(msg) {
    if (this.options.silent) {
      return;
    }

    return this.ui.writeWarnLine(`[ember-intl] ${msg}`);
  }
};
