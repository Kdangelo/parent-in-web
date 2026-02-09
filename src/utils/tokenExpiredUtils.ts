import {jwtDecode} from 'jwt-decode';

export const tokenExpiredUtils = (token: string | null): boolean => {

    if(!token) return true;

    try {
        
        const decodedToken = jwtDecode<{ exp: number }>(token);

        if(!decodedToken.exp) {
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);

        // if(typeof decodedToken.exp !== 'number') {
        //     return true;
        // }

        return decodedToken.exp < currentTime;

    } catch {
        return true;
    }
}