var assert = require('assert');
var RandomCodes = require('./lib/random-codes');

var rc = new RandomCodes();
console.log("OPTIONS: %j", rc.getOptions());
var code = rc.generate();
console.log("CODE: %s", code);

var input = code;
console.log("INPUT: %s", input);
assert.strictEqual(code, rc.validate(input));

input = input.split('-').join('');
console.log("INPUT: %s", input);
assert.strictEqual(code, rc.validate(input));

input = code.toLowerCase()
console.log("INPUT: %s", input);
assert.strictEqual(code, rc.validate(input));

input = input.split('-').join('');
console.log("INPUT: %s", input);
assert.strictEqual(code, rc.validate(input));
