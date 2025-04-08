import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleOAuthProvider } from '@react-oauth/google';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  googleClientId = '564056268905-9j2u47hutljdrv2rgepipilpgp2ogh3e.apps.googleusercontent.com'; // Replace with your actual Client ID
  private http = inject(HttpClient);

  constructor() { }

  handleGoogleSignInSuccess(credentialResponse: any) {
    const idToken = credentialResponse?.credential;
    if (idToken) {
      this.sendIdTokenToBackend(idToken).subscribe(
        (response) => {
          console.log('ID token sent and temporarily stored on backend', response);
          // Handle success, e.g., navigate to survey
        },
        (error) => {
          console.error('Error sending ID token to backend', error);
          // Handle error
        }
      );
    } else {
      console.error('No ID token received.');
    }
  }

  sendIdTokenToBackend(idToken: string) {
    return this.http.post('http://localhost:8765/auth/google/register', JSON.stringify({ idToken }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  // private http = inject(HttpClient);
  // private googleClientId: string;

  // constructor() {
  //   this.googleClientId = '564056268905-9j2u47hutljdrv2rgepipilpgp2ogh3e.apps.googleusercontent.com';
  // }

  // generateNonce(): string {
  //   const randomBytes = new Uint8Array(16);
  //   crypto.getRandomValues(randomBytes);
  //   return btoa(String.fromCharCode.apply(null, [...randomBytes]));
  // }


  // signInWithGoogle() {
  //   const nonce = this.generateNonce();
  //   localStorage.setItem('auth_nonce', nonce);

  //   const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.googleClientId}&redirect_uri=${window.location.origin}/auth/register&scope=openid profile email&response_type=token id_token&nonce=${nonce}`;
  //   window.location.href = googleAuthUrl;
  // }

  // handleGoogleSignInSuccess(credentialResponse: any) {
  //   const idToken = credentialResponse?.credential;
  //   if (idToken) {
  //     this.sendIdTokenToBackend(idToken).subscribe(
  //       (response) => {
  //         console.log('ID token sent and temporarily stored on backend', response);
  //         // Optionally, store a session identifier on the frontend if the backend provides one
  //         // Redirect the user to the survey page
  //         // You'll need to use the Angular Router for navigation
  //       },
  //       (error) => {
  //         console.error('Error sending ID token to backend', error);
  //         // Handle the error (e.g., display a message to the user)
  //       }
  //     );
  //   } else {
  //     console.error('No ID token received.');
  //     // Handle the case where no token is available
  //   }
  // }

  // sendIdTokenToBackend(idToken: string) {
  //   const storedNonce = localStorage.getItem('auth_nonce');
  //   localStorage.removeItem('auth_nonce'); // Remove after sending

  //   return this.http.post('/api/auth/google', JSON.stringify({ idToken, nonce: storedNonce }), {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  // }
}