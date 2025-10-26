import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel, PreferencesModel, SystemUserModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public googleClientId = environment.GOOGLE_CLIENT_ID
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient
  ){}

  storeGoogleCredentials(idToken: string){
    return this.http.post(this.apiUrl + '/auth/google/register',  JSON.stringify({ idToken }), {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }

  storeSystemCredentials(request: SystemUserModel){
    return this.http.post(this.apiUrl + '/auth/system/register', request, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }

  registerToSystem(request: PreferencesModel){
    return this.http.post(this.apiUrl + '/auth/register', request, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }

  loginWithGoogle(idToken: String){
    return this.http.post(this.apiUrl + '/auth/login/google', JSON.stringify({ idToken }), {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }

  loginWithSystem(request: LoginModel){
    return this.http.post(this.apiUrl + '/auth/login/system', request, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }

  logout(){
    return this.http.post(this.apiUrl + '/auth/logout', {}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }
}
