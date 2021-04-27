const chalk = require("chalk");

const info = (message, context) => {
  log(`${chalk.yellow(context)}: ${message}`);
};

const message = (message) => {
  log(`${chalk.blue(message)}`);
};

const log = (...message) => {
  const time = new Date().toUTCString();
  console.log(`${chalk.gray(time)}:`, ...message);
};

module.exports = {
  info,
  message,
  log,
};
