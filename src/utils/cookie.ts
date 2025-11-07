import Cookies from 'js-cookie';

export const getCookie = (name: string): string | null => {
    return Cookies.get(name) || null;
}