'use strict';
const path = require('path');
const Proto = require('uberproto');

const service = function (name, basePath, subItem = false) {
  const app = this;

  // Relay use to app.use with basePath applied  
  const use = function () {
    const args = Array.from(arguments);
    const subPath = args.shift();
    app.use(path.join(basePath, subPath), ...args);
  }

  // Relay service to app.service with basePath applied  
  const service = function (subPath) {
    return app.service(path.join(basePath, subPath));
  }

  // Create an object that will be added to `app`
  const newService = {};
  newService[name] = {
    use,
    service
  };

  // Return new service methods
  return (subItem === true)
    // Nest under versionate if flag set to true
    ? { versionate: newService } 
    : newService;
}

module.exports = function () {
  return function () {
    const app = this;
    // Main versionate function
    const versionate = function () {
      // Create new service
      const newService = service.apply(app, Array.from(arguments));
      // Add new service access method to app
      Proto.mixin(newService, app);
    }
    versionate.register = versionate; // retain original syntax
    // Add versionate to app
    Proto.mixin({ versionate }, app);
  }
}
