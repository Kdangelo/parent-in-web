import Cookies from 'js-cookie';

const DEFAULT_EXPIRY_DAYS = 7;

export const getCookie = (name: string): string | null => {
    return Cookies.get(name) || null;
}

export const setCookie = (name: string, value: string, days: number = DEFAULT_EXPIRY_DAYS): void => {
    Cookies.set(name, value, {expires: days, sameSite: 'Strict', secure: true});
}

export const removeCookie = (name: string): void => {
    Cookies.remove(name);
}