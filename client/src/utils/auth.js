// use this to decode a toke and get the user's information out of it 
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class Authservice {
    // get user data
    getProfile() {
        return decode(this.getToken());
    }
    
    // check if user's logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        // use type coersion to check if the token is not undefined and not expired
        return !!token && !this.isTokenExpired(token);
    }
    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // saves user token to localStorage
        localStorage.setItem('id_token', idToken);
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }

    logout(){
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new Authservice();

