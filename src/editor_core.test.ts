import { describe, it } from "mocha"
import { assert } from "chai";
import { findStartOfWordForward, findStartOfWordBackward, findEndOfWordForward, findEndOfWordBackward } from "./editor_core"

const exampleSentence = "The quick brown fox jumps over the lazy dog";
const emptySentence = "";
const spacedSentence = "this  has   many   spaces";
const multilineSentence = "this is the first line\nThis is the second line\r\n  This is the 3rd line";
const spacesAtStartSentence = "  cool beans";

describe('editor_core', () => {

    describe('findEndOfWordForward', () => {

        it('should return the same index when there are no more words', () => {
            assert.equal(findEndOfWordForward(emptySentence, 0), 0);
            assert.equal(findEndOfWordForward(exampleSentence, exampleSentence.length), exampleSentence.length);
        });

        it('should return the index at the end of the word', () => {
            assert.equal(findEndOfWordForward(exampleSentence, 0), 2);
            assert.equal(findEndOfWordForward(exampleSentence, 1), 2);
            assert.equal(findEndOfWordForward(exampleSentence, 2), 8);
            assert.equal(findEndOfWordForward(exampleSentence, 3), 8);
            assert.equal(findEndOfWordForward(exampleSentence, 4), 8);
            assert.equal(findEndOfWordForward(exampleSentence, 5), 8);
            assert.equal(findEndOfWordForward(exampleSentence, 6), 8);
            assert.equal(findEndOfWordForward(exampleSentence, 7), 8);
            assert.equal(findEndOfWordForward(exampleSentence, 8), 14);
        });

        it('should return the index at the end of the next word when there are many spaces between words', () => {
            assert.equal(findEndOfWordForward(spacedSentence, 3), 8);
            assert.equal(findEndOfWordForward(spacedSentence, 4), 8);
            assert.equal(findEndOfWordForward(spacedSentence, 5), 8);
        });

        it('should return the correct index when going to a word on a new line', () => {
            assert.equal(findEndOfWordForward(multilineSentence, 20), 21);
            assert.equal(findEndOfWordForward(multilineSentence, 21), 26);
            assert.equal(findEndOfWordForward(multilineSentence, 44), 45);
            assert.equal(findEndOfWordForward(multilineSentence, 45), 53);
        });

    });

    describe('findStartOfWordForward', () => {

        it('should return the same index for empty strings', () => {
            assert.equal(findStartOfWordForward(emptySentence, 0), 0);
            assert.equal(findStartOfWordForward(exampleSentence, 42), 42);
        })

        it('should return the same index when there are no more starts of words', () => {
            assert.equal(findStartOfWordForward(exampleSentence, 41), 41);
            assert.equal(findStartOfWordForward(exampleSentence, 40), 40);
        });

        it('should return the correct index when there are more starts of words', () => {
            assert.equal(findStartOfWordForward(exampleSentence, 0), 4);
            assert.equal(findStartOfWordForward(exampleSentence, 1), 4);
            assert.equal(findStartOfWordForward(exampleSentence, 2), 4);
            assert.equal(findStartOfWordForward(exampleSentence, 3), 4);
            assert.equal(findStartOfWordForward(exampleSentence, 4), 10);

            assert.equal(findStartOfWordForward(spacedSentence, 3), 6);
            assert.equal(findStartOfWordForward(spacedSentence, 4), 6);
            assert.equal(findStartOfWordForward(spacedSentence, 5), 6);
        });

        it('should return the correct index when there are newlines', () => {
            assert.equal(findStartOfWordForward(multilineSentence, 20), 23)
        })
    });

    describe('findStartOfWordBackward', () => {
        it('should return the same index for an empty string', () => {
            assert.equal(findStartOfWordBackward(emptySentence, 0), 0);
        });
        it('should return the same index for a string with no more starts of words', () => {
            assert.equal(findStartOfWordBackward(exampleSentence, 0), 0);
            assert.equal(findStartOfWordBackward(spacesAtStartSentence, 0), 0);
            assert.equal(findStartOfWordBackward(spacesAtStartSentence, 1), 1);
            assert.equal(findStartOfWordBackward(spacesAtStartSentence, 2), 2);
        });
        it('should return the index of the previous start of a word', () => {
            assert.equal(findStartOfWordBackward(exampleSentence, 0), 0);
            assert.equal(findStartOfWordBackward(exampleSentence, 1), 0);
            assert.equal(findStartOfWordBackward(exampleSentence, 2), 0);
            assert.equal(findStartOfWordBackward(exampleSentence, 3), 0);
            assert.equal(findStartOfWordBackward(exampleSentence, 4), 0);
            assert.equal(findStartOfWordBackward(exampleSentence, 5), 4);
        });
        it('should return the index of the previous start of a word over newlines', () => {
            assert.equal(findStartOfWordBackward(multilineSentence, 29), 28);
            assert.equal(findStartOfWordBackward(multilineSentence, 28), 23);
            assert.equal(findStartOfWordBackward(multilineSentence, 23), 18);
        })
    });

    describe('findEndOfWordBackward', () => {
        it('should return the same index for an empty string', () => {
            assert.equal(findEndOfWordBackward(emptySentence, 0), 0);
        });
        it('should return the same index for a string with no previous words', () => {
            assert.equal(findEndOfWordBackward(spacesAtStartSentence, 0), 0);
            assert.equal(findEndOfWordBackward(spacesAtStartSentence, 1), 1);
            assert.equal(findEndOfWordBackward(spacesAtStartSentence, 2), 2);
            assert.equal(findEndOfWordBackward(spacesAtStartSentence, 3), 3);
            assert.equal(findEndOfWordBackward(spacesAtStartSentence, 4), 4);
            assert.equal(findEndOfWordBackward(spacesAtStartSentence, 5), 5);
        });
        it('should return the correct index for a string with previous words', () => {
            assert.equal(findEndOfWordBackward(spacesAtStartSentence, 6), 5);
        })
    })

});