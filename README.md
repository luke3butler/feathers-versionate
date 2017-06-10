
# feathers-versionate

## About
> Service nesting for feathersjs

Nests services under configurable base paths, and provides easy methods to access those services.

## Getting Started

Install the module  

NPM: `npm install feathers-versionate --save`  

Yarn: `yarn add feathers-versionate`

```js
var feathers = require('feathers');
var versionate = require('feathers-versionate');
var memory = require('feathers-memory');

const app = feathers();
// Configure versionate
app.configure(versionate());
// Register a base-path "/api/v2", and provide access to it via `app.v2`
app.versionate('v2', '/api/v2/');
// Now you can use `app.v2` to create and access services under the registered path!
app.v2.use('/users', memory); // http://localhost:3030/api/v2/users
// We can access services easily too!
const userService = app.v2.service('users');
```

## Documentation

`feathers-versionate` It a utility that creates wrappers for app.use and app.service with nested root paths.

* `app.versionate(name, basePath)`
* `app.versionate.register(name, basePath)` (app.versionate alias)

`feathers-versionate` services

* `app.versionateName.use(path, service)` 
  - wraps `app.use` and includes the versionate basePath behind the scenes
* `app.versionateName.service(path)` 
  - wraps `app.service` and includes the versionate basePath behind the scenes

### Examples

```js
const app = feathers();
// Configure versionate
app.configure(versionate());
// Register a versionate base paths
app.versionate('v1', '/api/v1/');
// You can register as many "versionations" as you'd like
app.versionate('v2', '/api/v2/');
// If the 3rd argument is set to true, the service will be nested under app.versionate
app.versionate('docs', 'docs', true);
// Nesting under versionate is useful if you don't want to pollute `app` with lots of children
app.versionate.docs.use('quick-guide');

// Once registered, you can use app.versionateName anywhere in your app!
app.v1.use('/users', userServiceV1);
app.v2.use('/users', userServiceV2);

// Retrieve a service through the versionate name
const usersV2 = app.v2.service('users');
// You can also access services by their full path on app.service
const usersV1 = app.service('/api/v1/users');

// Use the service just like normal
usersV2.find().then(items => console.log('.find()', items));

```

## Release History

__0.2.0__

- Add app.versionate as main function
- Add tests
- Fix app.versionate nesting of service access methods

__0.1.0__

- Initial release
- Support for app.use and app.service