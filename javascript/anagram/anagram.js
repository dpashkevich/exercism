"use strict";

/**
 * @class Anagram
 * Anagram detector
 *
 * @constructor
 * @param {String} word The initial word to match others against
 */
var Anagram = function(word) {
    this.word = word;

    // cache computed values
    this._normalized = this.normalize(word);
    this._alphabetized = this.alphabetize(this._normalized);
};

Anagram.prototype = {
    constructor: Anagram,

    /**
     * Cleans up passed string and normalizes its case for usage in comparisons
     * @static
     * @param  {String} s
     * @return {String}
     */
    normalize: function(s) {
        return s.trim().toLowerCase();
    },

    /**
     * Alphabetizes a string
     * @static
     * @param  {String} s
     * @return {String}
     */
    alphabetize: function(s) {
        return s.split('').sort().join('');
    },

    /**
     * Returns true if passed word equals this anagram's own word
     * @param  {String}  word
     * @return {Boolean}
     */
    isOwn: function(word) {
        return this._normalized == this.normalize(word);
    },

    /**
     * Returns true if passed word is an anagram of the current word
     * @param  {String} candidate
     * @return {Boolean}
     */
    matches: function(candidate) {
        candidate = this.normalize(candidate);

        // don't detect a word as its own anagram
        return  !this.isOwn(candidate) &&
                this._alphabetized == this.alphabetize(candidate);
    },

    /**
     * Given an array of candidate words, returns a new array containing only anagrams of
     * the current word
     * @param  {String/String[]} candidates Array of candidate strings or a single string
     * @return {String[]}                   Array of matching anagrams
     */
    match: function(candidates) {
        if(typeof candidates == 'string') {
            candidates = [candidates];
        }
        return candidates.filter(this.matches, this);
    }
};

module.exports = Anagram;
