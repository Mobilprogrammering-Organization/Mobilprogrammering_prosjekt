// https://truelist.io/blog/javascript-validate-email

const emailRegExp : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmailFormat (email: string): boolean {
    if (typeof email !== 'string') return false;
    if (email.length > 254 || email.length < 3) return false;

    return emailRegExp.test(email.trim());

}