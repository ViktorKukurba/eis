var ncp = require('ncp').ncp;
var path = require('path');
var bundler = require('./generate_bundle_templates.js');

ncp.limit = 16;

bundler.bundleTemplates();

const baseDestination = '../wordpress/wp-content/themes/invest/';
const FOLDERS_FILES_TO_COPY = ['dist', 'php', 'functions.php', 'index.php', 'header.php', 'footer.php', 'style.css', 'screenshot.png'];

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
