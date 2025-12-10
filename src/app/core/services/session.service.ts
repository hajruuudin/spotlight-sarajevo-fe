import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { LoggedUserModel } from '../../shared/models/auth.model';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly APP_LANG_KEY = "app_language"
  private readonly APP_USER_KEY = "app_user"
  private readonly APP_THEME_KEY = "app_theme"

  private languageSubject = new BehaviorSubject<string>(this.getStoredLanguageFallback())
  private userSubject = new BehaviorSubject<LoggedUserModel | null>(this.getStoredUser())
  private themeSubject = new BehaviorSubject<string>(this.getStoredThemeFallback())

  language = this.languageSubject.asObservable();
  user = this.userSubject.asObservable();
  theme = this.themeSubject.asObservable();

  constructor( 
    private transloco: TranslocoService,
    private auth: AuthService,
    private router: Router
  ) {
  
    this.transloco.setActiveLang(this.languageSubject.value);
    this.applyTheme(this.getStoredThemeFallback())
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

  private applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // ======== THEME MANAGEMENT ======== //
  setStoredTheme(newTheme: string) : void {
    localStorage.setItem(this.APP_THEME_KEY, newTheme)
    this.themeSubject.next(newTheme)
  }

  getStoredTheme() : string{
    return this.themeSubject.value
  }

  getStoredThemeFallback() : string {
    return localStorage.getItem(this.APP_THEME_KEY) || 'dark'
  }

  //========== USER MANAGEMENT ==========//
  setUser(userResponse: any): void {
    const actualUser = userResponse.user ?? userResponse;
    localStorage.setItem(this.APP_USER_KEY, JSON.stringify(actualUser));
    this.userSubject.next(actualUser);
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

  getStoredUser(): LoggedUserModel | null {
    const data = localStorage.getItem(this.APP_USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  restoreSession() {
    return this.auth.isAuthenticated().pipe(
      tap((response: any) => {
        if (response) {
          const actualUser = response.user ?? response;
          this.setUser(actualUser);
        }
      }),
      map(response => response != null),
      catchError(() => of(false))
    );
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
