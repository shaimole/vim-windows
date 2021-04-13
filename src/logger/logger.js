const chalk = require('chalk')
const log = (msg) => {
    console.log();
    console.log(msg);
    console.log();
}
module.exports = {
    loading() {
       return (function() {
            var P = ["\\", "|", "/", "-"];
            var x = 0;
            return setInterval(function() {
              process.stdout.write(chalk.yellow("\r" + P[x++]));
              x &= 3;
            }, 250);
          })();
    },
    warning(msg) {
        log(chalk.yellow(msg))
    },
    success(msg) {
        log(chalk.green(msg))
    },
    error(msg) {
        log(chalk.red(msg))
    }
}