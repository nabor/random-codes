"use strict";
var xtend = require('xtend');

var RandomCodes = function (options) {
    var _options = xtend({
        // A string containing available chars
        chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        // Separator char used to divide code parts
        separator: '-',

        // Char used to mask code
        mask: '*',

        // Number of parts the code contains
        parts: 3,

        // Size of each part
        part_size: 4,

        // Function used to get a random char from the chars pool
        // (Please use a better one)
        getChar: function (pool) {
            var random = Math.floor(Math.random() * pool.length);
            return pool.charAt(random);
        }
    }, options);

    this.generate = function () {
        var parts = [];
        for (var i = 0; i < _options.parts; i++) {
            var chunk = '';
            for (var k = 0; k < _options.part_size; k++) {
                chunk += _options.getChar(_options.chars);
            }
            parts.push(chunk);
        }
        return parts.join(_options.separator);
    };

    this.validate = function(code){
        code = code.toUpperCase().replace(/\-/g, '');
        var parts = [];
        var aux = code;
        while( aux.length > 0 ) {
            parts.push(aux.substr(0, _options.part_size));
            aux = aux.substring(_options.part_size);
        }

        if (parts.length != _options.parts) {
            return '';
        }
        for (var i = 0; i < parts.length; i++) {
            if (parts[i].length != _options.part_size) {
                return '';
            }
            for (var k = 0; k < parts[i].length; k++){
                if (_options.chars.indexOf(parts[i].charAt(k)) < 0) {
                    return '';
                }
            }
        }
        return parts.join(_options.separator);
    };

    this.mask = function(code) {
        code = code.toUpperCase().replace(/\-/g, '');
        var parts = [];
        var aux = code;
        while( aux.length > 0 ) {
            parts.push(aux.substr(0, _options.part_size));
            aux = aux.substring(_options.part_size);
        }
        for (var i = 0; i < parts.length; i++) {
            if(i < parts.length - 1) {
                parts[i] = Array(_options.part_size+1).join(_options.mask);
            }
        }
        return parts.join(_options.separator);
    };

    this.getOptions = function () {
        return _options;
    }
};

module.exports = RandomCodes;