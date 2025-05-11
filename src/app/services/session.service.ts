import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoggedUserProfile } from '../models/user-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUserSubject = new BehaviorSubject<LoggedUserProfile | null>(null);
  currentUser$: Observable<LoggedUserProfile | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.loadInitialSession();
  }


  fetchUserProfile(): Observable<LoggedUserProfile> {
    return this.http.get<LoggedUserProfile>('/api/user/profile').pipe(
      tap(userProfile => {
        this.setCurrentUser(userProfile);
      })
    );
  }

  private loadInitialSession(): void {
    this.fetchUserProfile().subscribe({
      error: () => {
        this.clearCurrentUser();
      }
    });
  }

  setCurrentUser(user: LoggedUserProfile): void {
    this.currentUserSubject.next(user);
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): LoggedUserProfile | null {
    return this.currentUserSubject.value;
  }

  get isCurrentUserPremium(): boolean {
    return this.currentUserValue ? this.currentUserValue.isPremium : false;
  }

  get isCurrentUserAdmin(): boolean {
    return this.currentUserValue ? this.currentUserValue.isAdmin : false;
  }
}