import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggedUserProfile } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUserSubject = new BehaviorSubject<LoggedUserProfile| null>(null);
  currentUser$: Observable<LoggedUserProfile| null> = this.currentUserSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('SScurrentUser');
    if (storedUser) {
      try {
        this.setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.clearCurrentUser();
      }
    }
  }

  setCurrentUser(user: LoggedUserProfile): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('SScurrentUser', JSON.stringify(user));
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('SScurrentUser');
  }

  get currentUserValue(): LoggedUserProfile| null {
    return this.currentUserSubject.value;
  }
}