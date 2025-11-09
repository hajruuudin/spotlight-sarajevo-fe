import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggedUserModel } from '../models/auth.model';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly APP_LANG_KEY = "app_language"
  private readonly APP_USER_KEY = "app_user"

  private languageSubject = new BehaviorSubject<string>(this.getStoredLanguageFallback())
  private userSubject = new BehaviorSubject<LoggedUserModel | null>(this.getStoredUser())

  language = this.languageSubject.asObservable();
  user = this.userSubject.asObservable();

  constructor( private transloco: TranslocoService) {
    this.transloco.setActiveLang(this.languageSubject.value);
  }

  // ======== LANGUAGE MANAGEMENT ======== //
  setStoredLanguage(lang: string) : void {
    this.transloco.setActiveLang(lang)
    localStorage.setItem(this.APP_LANG_KEY, lang)
    this.languageSubject.next(lang)
  }

  getStoredLanguage() : string{
    return this.languageSubject.value
  }

  getStoredLanguageFallback() : string {
    return localStorage.getItem(this.APP_LANG_KEY) || 'en'
  }


  //========== USER MANAGEMENT ==========//
  setUser(user: LoggedUserModel): void {
    localStorage.setItem(this.APP_USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): LoggedUserModel | null {
    return this.userSubject.value;
  }

  getUserId(): number | null {
    return this.userSubject.value?.id ?? null;
  }

  clearUser(): void {
    localStorage.removeItem(this.APP_USER_KEY);
    this.userSubject.next(null);
  }

  private getStoredUser(): LoggedUserModel | null {
    const data = localStorage.getItem(this.APP_USER_KEY);
    return data ? JSON.parse(data) : null;
  }


  //========== CLEARING THE SESSION ==========//
  clearSession() : void {
    localStorage.removeItem(this.APP_LANG_KEY)
    localStorage.removeItem(this.APP_USER_KEY)
    this.languageSubject.next('en')
    this.userSubject.next(null)
    this.transloco.setActiveLang('en')
  }
}
