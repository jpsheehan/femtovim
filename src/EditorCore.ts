/**
 * Finds the next word within the string from some index.
 * If this is the last word in the string then the index does not change.
 * 
 * @param str The string.
 * @param idx The current cursor index in the string.
 * @returns The new cursor index.
 */
function findNextWord(str: string, idx: number): number {
    const strFromIdx = str.substring(idx);
    const idxOfWhiteSpace = strFromIdx.search(/\s/);
    if (idxOfWhiteSpace === -1) {
        return idx;
    }
    const strFromWhiteSpace = strFromIdx.substring(idxOfWhiteSpace);
    const idxOfNextWord = strFromWhiteSpace.search(/\w/);
    if (idxOfNextWord === -1) {
        return idx;
    }

    return -1;
}

/**
 * Finds the end of the current or next word (whichever is closer).
 * If there are no other words in the buffer, then return `idx`.
 * 
 * @param str The string.
 * @param idx The current cursor index in the string.
 * @returns The new cursor index.
 */
export function findEndOfWord(str: string, idx: number): number {
    const strFromIdx = str.substring(idx);
    if (strFromIdx.length === 0) {
        return idx;
    }

    // find the next word character in the string
    const idxOfNextWord = strFromIdx.search(/\w/);
    if (idxOfNextWord === -1) {
        return idx;
    }
    const strFromNextWord = strFromIdx.substring(idxOfNextWord);

    // find the next non-word character in the string
    const idxOfNextNonWord = strFromNextWord.search(/\W/);
    if (idxOfNextNonWord === -1) {
        return idx;
    }

    // go forward one character as we didn't skip the current word
    if (idxOfNextNonWord === 1) {
        return findEndOfWord(str, idx + idxOfNextWord + 1);
    }

    // go backward one character to get the last character in the word
    return idx + idxOfNextWord + idxOfNextNonWord - 1;
}