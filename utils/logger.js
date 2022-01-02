import chalk from 'chalk';

export class Logger {
  constructor(prefix = '', formatters = {}) {
    this.formatters = formatters;
    this.prefix = prefix;
  }

  _logMessage(type, color, ...args) {
    args = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : a));
    let message = [...args];

    const formatterCallback =
      this.formatters[type] || this.formatters.all || null;
    if (formatterCallback) {
      message = [...formatterCallback(...args)];
    }

    const chalkFn = chalk[color] || chalk.reset;
    console.log(chalkFn(this.prefix, ...message));
  }

  log(...args) {
    this._logMessage('log', 'reset', args);
  }

  info(...args) {
    this._logMessage('info', 'gray', args);
  }

  error(...args) {
    this._logMessage('error', 'red', args);
  }

  success(...args) {
    this._logMessage('success', 'green', args);
  }

  warn(...args) {
    this._logMessage('warn', 'magenta', args);
  }

  data(...args) {
    this._logMessage('data', 'blue', args);
  }

  default(...args) {
    console.log(this.prefix, ...args);
  }
}

const logger = new Logger();

export default logger;
