/**
 * Finds the start of the next word within the string from some index.
 * If this is the last word in the string then the index does not change.
 * 
 * @param str The string.
 * @param idx The current cursor index in the string.
 * @returns The new cursor index.
 */
export function findStartOfWordForward(str: string, idx: number): number {
    const strFromIdx = str.substring(idx);
    if (strFromIdx.length === 0) {
        return idx;
    }

    const idxOfNextNonWord = strFromIdx.search(/\W/);
    if (idxOfNextNonWord === -1) {
        return idx;
    }
    const strFromNextNonWord = strFromIdx.substring(idxOfNextNonWord);

    const idxOfNextWord = strFromNextNonWord.search(/\w/);
    if (idxOfNextWord === -1) {
        return idx;
    }

    return idx + idxOfNextNonWord + idxOfNextWord;
}

/**
 * Finds the end of the current word (if the cursor is not at the end of the word) or the end of the next word.
 * If there are no other words in the buffer, then return `idx`.
 * 
 * @param str The string.
 * @param idx The current cursor index in the string.
 * @returns The new cursor index.
 */
export function findEndOfWordForward(str: string, idx: number): number {
    const strFromIdx = str.substring(idx + 1);
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

    // go backward one character to get the last character in the word
    return idx + idxOfNextWord + idxOfNextNonWord;
}
