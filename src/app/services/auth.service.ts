import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreferencesModel } from '../models/preferences.model';
import { SystemUserModel } from '../models/system-user.model';
import { SystemLogin } from '../models/system-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  googleClientId = '564056268905-9j2u47hutljdrv2rgepipilpgp2ogh3e.apps.googleusercontent.com';
  private http = inject(HttpClient);

  constructor() { }

  sendIdTokenToBackend(idToken: string) {
    return this.http.post('/api/auth/google/register', JSON.stringify({ idToken }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  sendIdTokenToBackendLogin(idToken: string) {
    return this.http.post('/api/auth/login/google', JSON.stringify({ idToken }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  handleSystemSignIn(request: SystemUserModel) {
    return this.http.post('/api/auth/system/register', request, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }

  handleSystemLogIn(request: SystemLogin) {
    return this.http.post('/api/auth/login/system', request, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }

  handleSystemLogOut() {
    return this.http.post(`api/auth/logout`, {}, {
      withCredentials: true
    })
  }

  registerWithSurveyData(request: PreferencesModel) {
    return this.http.post('/api/auth/register', request, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }

  checkEmailTaken(request: string) {
    return this.http.get(`/api/auth/check-email?email=${request}`, {
      withCredentials: true
    })
  }


}