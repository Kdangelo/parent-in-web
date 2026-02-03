import {jwtDecode} from 'jwt-decode';

export const tokenExpiredUtils = (token: string | null): boolean | undefined => {

    if(!token) return true;

    try {
        
        const decodedToken = jwtDecode<{ exp: number }>(token);

        const currentTime = Math.floor(Date.now() / 1000);

        if(typeof decodedToken.exp !== 'number') {
            return true;
        }

        return decodedToken.exp < currentTime;

    } catch (error) {
        if(error instanceof Error) {
            console.error('Error decoding token:', error.message);
            return true;
        }
    }
}