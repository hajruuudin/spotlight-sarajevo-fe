import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post(this.apiUrl + '/auth/storeGoogleCredentials',  JSON.stringify({ idToken }), {
       headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
