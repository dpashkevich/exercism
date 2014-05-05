"use strict";

/**
 * Simple string interpolation helper
 * @param  {String} s Input string
 * @param  {Object} o Values to supplant
 * @return {String}
 */
function supplant(s, o) {
    return s.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
}

/**
 * Partial for a plural or a singular for 'bottle'
 * @param  {Number} num
 * @return {String}
 */
function bottleWord(num) {
    return num == 1 ? 'bottle' : 'bottles';
}

/**
 * Partial for 'N bottles of beer'
 * @param  {Number} num
 * @return {String}
 */
function bottlesOfBeer(num) {
    return (num ? num : 'no more') + ' ' + bottleWord(num) + ' of beer';
}

/**
 * Returns a specific verse from the song
 * @param  {Number} num Verse number
 * @return {String}
 */
function verse(num) {
    var lines,
        tpl;

    if(num > 0) {
        tpl = [
            '{origCount} on the wall, {origCount}.',
            'Take {itOrOne} down and pass it around, {decCount} on the wall.'
        ].join('\n');

        lines = supplant(tpl, {
            origCount:  bottlesOfBeer(num),
            itOrOne:    num == 1 ? 'it' : 'one',
            decCount:   bottlesOfBeer(num - 1)
        });
    } else {
        lines = [
            'No more bottles of beer on the wall, no more bottles of beer.',
            'Go to the store and buy some more, 99 bottles of beer on the wall.'
        ].join('\n');
    }

    return lines + '\n';
}

/**
 * Sings specified verses or the entire song
 * @param  {Number} [from] Starting verse, 99 if omitted
 * @param  {Number} [to]   Ending verse, sings the rest of the song if omitted
 * @return {String}
 */
function sing(from, to) {
    from = from || 99;
    to = to || 0;

    var step = to < from ? -1 : 1,
        i = from,
        result = [];

    do {
        result.push(verse(i));
        i+= step;
    } while(i != to + step);

    return result.join('\n');
}

module.exports = {
    verse: verse,
    sing: sing
};
