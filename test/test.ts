import { describe, it } from "mocha"
import { assert } from "chai";
import { findEndOfWordForward } from "../src/EditorCore"

const exampleSentence = "The quick brown fox jumps over the lazy dog";
const emptySentence = "";
const spacedSentence = "this  has   many   spaces";
const multilineSentence = "this is the first line\nThis is the second line\r\n  This is the 3rd line";

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
    })

});
