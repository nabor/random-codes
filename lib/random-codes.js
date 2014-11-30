"use strict";
var xtend = require('xtend');

var RandomCodes = function (options) {
    var _options = xtend({
        chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        separator: '-',
        parts: 3,
        part_size: 4,
        getChar: function (pool) {
            var random = Math.floor(Math.random() * pool.length);
            return pool.charAt(random);
        }
    }, options);

    this.generate = function () {
        var parts = [];
        for (var i = 0; i < _options.parts; i++) {
            var chunk = '';
            for (var k = 0; k < _options.size; k++) {
                chunk += _options.getChar(_options.chars);
            }
            parts.push(chunk);
        }
        return parts.join(_options.separator);
    };

    this.validate = function(code){
        code = code.toUpperCase();
        var parts = code.split(_options.separator);
        if (parts.length != _options.parts) {
            return false;
        }
        for (var i = 0; i < parts.length; i++) {
            if (parts[i].length != _options.part_size) {
                return false;
            }
            for (var k = 0; k < parts[i].length; k++){
                if (_options.chars.indexOf(parts[i].charAt(k)) < 0) {
                    return false;
                }
            }
        }
        return true;
    };

    this.getOptions = function () {
        return _options;
    }
};

module.exports = RandomCodes;