'use strict';
var test = require('ava');
var feathers = require('feathers');
var versionate = require('../src/');

var app;

const service = {
  find(params) {
    return Promise.resolve([{
      id: 1,
      text: 'Message 1'
    }]);
  }
}

test.before.serial(t => {
  app = feathers();
  app.configure(versionate());
});

test.serial('versionate added to feathers', t => {
  t.true(app.hasOwnProperty('versionate'), 'app.versionate exists');
  t.true(typeof app.versionate === 'function', 'app.versionate function created successfully');
  // Add versionate item
  app.versionate('v1', '/api/v1');
});

test('app.versionate.register added', t => {
  t.true(app.versionate.hasOwnProperty('register'));
});

test('versionate item added', t => {
  t.true(app.hasOwnProperty('v1'), 'feathers contains new service proxy');
  t.true(app.v1.hasOwnProperty('use'), 'proxy contains .use');
  t.true(app.v1.hasOwnProperty('service'), 'proxy contains .service');
  t.is(typeof app.v1.use, 'function', '"use" is a function');
  t.is(typeof app.v1.service, 'function', '"service" is a function');
});

test('add a service', t => {
  app.v1.use('test', service);
  const testService = app.v1.service('test');
  // alternative access method
  const testService2 = app.service('/api/v1/test');
  
  // plan for all tests
  t.plan(5);

  t.is(typeof testService, 'object', 'test service is defined');
  t.is(typeof testService2, 'object', 'Alternative access method defined');
  t.is(typeof testService.find, 'function', 'service find method exists');

  return testService.find().then(res => {
    t.true(Array.isArray(res), 'response is an array');
    t.is(res.shift().text, 'Message 1', 'service method response is correct');
  })
});

test('nest named access under versionate ', t => {
  // Create app.versionate.nested item by passing true flag
  app.versionate('nested', 'test2', true);

  t.true(app.versionate.hasOwnProperty('nested'), 'created successfully');
  t.is(typeof app.versionate.nested.use, 'function', 'nested.use created')
});
