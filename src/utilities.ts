export function isWordCharacter(s: string) {
    const c = s.charCodeAt(0);
    return '0'.charCodeAt(0) <= c && c <= '9'.charCodeAt(0) ||
        'A'.charCodeAt(0) <= c && c <= 'Z'.charCodeAt(0) ||
        'a'.charCodeAt(0) <= c && c <= 'z'.charCodeAt(0) ||
        c === '_'.charCodeAt(0);
}

export function isNonWordCharacter(c: string): boolean {
    return !isWordCharacter(c);
}