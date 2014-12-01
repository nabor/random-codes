random-codes
============

Customizable random codes generator to use for example generating giftcards codes

## Instalation
Install using [npm](http://github.com/isaacs/npm):

    $ npm install random-codes
    
## Usage
You can crete a RandomCodes object with your own config array

```javascript
var RandomCodes = require('random-codes');
var rc = new RandomCodes(config);
```

### Code creation

```javascript
var code = rc.generate();
// >> 'S5RU-1K1U-F77Z'
```

### Code validation
The validation function gets a user input and returns it formatted as defined by the config array

```javascript
var validated_code = rc.validate('S5RU-1K1U-F77Z');
// >> 'S5RU-1K1U-F77Z'
var validated_code = rc.validate('S5RU1K1UF77Z');
// >> 'S5RU-1K1U-F77Z'
var validated_code = rc.validate('s5ru-1k1u-f77z');
// >> 'S5RU-1K1U-F77Z'
var validated_code = rc.validate('s5ru1k1uf77z');
// >> 'S5RU-1K1U-F77Z'
```

## Config
You can modify any parameter in the config array, the default one is:

```javascript
var config = {
    // A string containing available chars
    chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    
    // Separator char used to divide code parts
    separator: '-',
    
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
};
```

Keep in mind that the validate function assumes that you only use upper case letters to generate codes