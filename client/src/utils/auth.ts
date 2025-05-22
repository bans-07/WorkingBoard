import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      return decoded.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();


// import { JwtPayload, jwtDecode } from 'jwt-decode';

// class AuthService {
//   getProfile() {
//     // TODO: return the decoded token
//   }

//   loggedIn() {
//     // TODO: return a value that indicates if the user is logged in
//   }
  
//   isTokenExpired(token: string) {
//     // TODO: return a value that indicates if the token is expired
//   }

//   getToken(): string {
//     // TODO: return the token
//   }

//   login(idToken: string) {
//     // TODO: set the token to localStorage
//     // TODO: redirect to the home page
//   }

//   logout() {
//     // TODO: remove the token from localStorage
//     // TODO: redirect to the login page
//   }
// }

// export default new AuthService();
