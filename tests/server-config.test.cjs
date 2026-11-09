const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const settings = JSON.parse(fs.readFileSync(path.join(root, 'angular.json'), 'utf8'));
const expected = path.resolve(root, settings.projects['ca-webpage'].architect.build.options.outputPath);
const calls = {};
const app = { use(dir) { calls.static = dir; }, get(route, handler) { calls.route = route; calls.handler = handler; }, listen(port) { calls.port = port; } };
const express = () => app;
express.static = dir => dir;
vm.runInNewContext(fs.readFileSync(path.join(root, 'server.js'), 'utf8'), {
  require: name => name === 'express' ? express : require(name),
  __dirname: root,
  process: {env: {PORT: '9000'}}
});
assert.equal(calls.static, expected);
assert.equal(calls.route, '*');
let sent;
calls.handler({}, {sendFile: file => {sent = file;}});
assert.equal(sent, path.join(expected, 'index.html'));
assert.equal(calls.port, '9000');
console.log('PASS: static directory, SPA fallback and configured port');
