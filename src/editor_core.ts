import { isWordCharacter, isNonWordCharacter } from "./utilities";

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

/**
 * Returns the first index of the start of a word looking backwards through `str` from `idx`.
 * @param str The string.
 * @param idx The index of the cursor.
 */
export function findStartOfWordBackward(str: string, idx: number): number {
    let hasFoundWord = false;

    let i = idx - 1;
    while (i >= 0) {
        const c = str[i];

        if (!hasFoundWord) {
            if (isWordCharacter(c)) {
                hasFoundWord = true;
            }
        } else {
            // we've just gone past the start of the word
            if (isNonWordCharacter(c)) {
                return i + 1;
            }
        }

        // we're at the start of the string and we have a word character
        if (i === 0 && isWordCharacter(c)) {
            return i;
        }

        i -= 1;
    }

    return idx;
}

/**
 * Attempts to find the end of the previous word.
 * If not found, then the `idx` will be returned.
 * 
 * @param str The string.
 * @param idx The index of the cursor.
 * @returns The index of the end of the previous word (if it exists).
 */
export function findEndOfWordBackward(str: string, idx: number): number {
    let hasFoundNonWord = false;

    let i = idx;
    while (i >= 0 && i < str.length) {
        const c = str[i];

        if (!hasFoundNonWord) {
            if (isNonWordCharacter(c)) {
                hasFoundNonWord = true;
            }
        } else {
            if (isWordCharacter(c)) {
                return i;
            }
        }

        i--;
    }

    return idx;
}