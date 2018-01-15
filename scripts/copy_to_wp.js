var ncp = require('ncp').ncp;
var path = require('path');

ncp.limit = 16;

const baseDestination = '../wordpress/wp-content/themes/invest/';
const FOLDERS_FILES_TO_COPY = ['dist', 'php', 'functions.php', 'index.php'];

const errorHandler = function(source) {
  return function (err) {
    if (err) {
      return console.error(err);
    }
    console.log(source + ' copied successfully');
  }
}

FOLDERS_FILES_TO_COPY.forEach(function (f) {
  ncp(f, path.resolve(baseDestination, f), errorHandler(f));
});

// ncp('./php', path.resolve(baseDestination, 'php'), errorHandler('php'));
// ncp('./functions.php', path.resolve(baseDestination, 'functions.php'), errorHandler('functions.php'));
// ncp('./functions.php', path.resolve(baseDestination, 'functions.php'), errorHandler('functions.php'));