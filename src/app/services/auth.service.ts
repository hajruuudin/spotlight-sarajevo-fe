import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PreferencesModel } from '../models/preferences.model';
import { SystemUserModel } from '../models/system-user.model';

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
        },
        (error) => {
          console.error('Error sending ID token to backend', error);
        }
      );
    } else {
      console.error('No ID token received.');
    }
  }

  sendIdTokenToBackend(idToken: string) {
    return this.http.post('/api/auth/google/register', JSON.stringify({ idToken }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  handleSystemSignIn(request: SystemUserModel){
    return this.http.post('/api/auth/system/register', request, {
      headers: {
        'Content-Type' : 'application/json'
      },
      withCredentials: true
    })
  }

  registerWithSurveyData(request: PreferencesModel){
    return this.http.post('/api/auth/register', request, {
      headers: {
        'Content-Type' : 'application/json'
      },
      withCredentials: true
    });
  }

  
  
}