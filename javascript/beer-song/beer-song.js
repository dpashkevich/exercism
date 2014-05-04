"use strict";

function bottleWord(num) {
    return num == 1 ? 'bottle' : 'bottles';
}

function bottlesOfBeer(num) {
    return (num ? num : 'no more') + ' ' + bottleWord(num) + ' of beer';
}

function verseTpl(num) {
    var lines;

    if(num > 0) {
        lines = [
            bottlesOfBeer(num) + ' on the wall, ' + bottlesOfBeer(num) + '.',
            'Take ' + (num == 1 ? 'it' : 'one') + ' down and pass it around, ' + bottlesOfBeer(num - 1) + ' on the wall.'
        ];
    } else {
        lines = [
            'No more bottles of beer on the wall, no more bottles of beer.',
            'Go to the store and buy some more, 99 bottles of beer on the wall.'
        ];
    }

    return lines.join('\n') + '\n';
}

var Beer = {
    verse: function(num) {
        return verseTpl(num);
    },

    sing: function(from, to) {
        to = to || 0;

        var step = to < from ? -1 : 1,
            i = from,
            result = [];

        do {
            result.push(verseTpl(i));
            i+= step;
        } while(i != to + step);

        return result.join('\n');
    }
};

module.exports = Beer;
