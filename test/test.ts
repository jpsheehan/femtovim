import { describe, it } from "mocha"
import { assert } from "chai";
import { findEndOfWord } from "../src/EditorCore"

const exampleSentence = "The quick brown fox jumps over the lazy dog";
const emptySentence = "";
const spacedSentence = "this  has   many   spaces"

describe('findEndOfWord', () => {

    it('should return the same index when there are no more words', () => {
        assert.equal(findEndOfWord(emptySentence, 0), 0);
        assert.equal(findEndOfWord(exampleSentence, exampleSentence.length), exampleSentence.length);
    });

    it('should return the index at the end of the word', () => {
        assert.equal(findEndOfWord(exampleSentence, 0), 2);
        assert.equal(findEndOfWord(exampleSentence, 1), 2);
        assert.equal(findEndOfWord(exampleSentence, 2), 8);
        assert.equal(findEndOfWord(exampleSentence, 3), 8);
        assert.equal(findEndOfWord(exampleSentence, 4), 8);
        assert.equal(findEndOfWord(exampleSentence, 5), 8);
        assert.equal(findEndOfWord(exampleSentence, 6), 8);
        assert.equal(findEndOfWord(exampleSentence, 7), 8);
        assert.equal(findEndOfWord(exampleSentence, 8), 14);
    });

    it('should return the index at the end of the next word when there are many spaces between words', () => {
        assert.equal(findEndOfWord(spacedSentence, 3), 8);
        assert.equal(findEndOfWord(spacedSentence, 4), 8);
        assert.equal(findEndOfWord(spacedSentence, 5), 8);
    });

});
