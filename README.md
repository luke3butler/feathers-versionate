
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
app.versionate.register('v2', '/api/v2/');
// Now you can use `app.v2` to create and access services under the registered path!
app.v2.use('/users', memory); // http://localhost:3030/api/v2/users
```

## Documentation

`feathers-versionate` is just a wrapper around app.use and app.service for applying

* `app.versionate.register(name, basePath)`

## Release History

__0.1.0__

- Initial release
- Support for app.use and app.service