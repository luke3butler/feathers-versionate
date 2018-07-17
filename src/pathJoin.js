var path = require('path');

module.exports = function (args1, args2 /*, ... argsN*/ ) {
  var fullPath = path.join.apply(null, arguments);
  // If the platform is windows, swap back slashes to forward slashes
  return (process.platform === 'win32') ? fullPath.replace(/\\/g, '/') : fullPath;
}
