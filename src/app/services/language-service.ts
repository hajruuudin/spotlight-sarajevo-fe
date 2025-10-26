import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en')
  currrentLang$ = this.currentLangSubject.asObservable()

  constructor(
    private transloco: TranslocoService
  ){
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string){
    this.transloco.setActiveLang(lang); 
    this.currentLangSubject.next(lang); 
    localStorage.setItem('appLanguage', lang);
  }

  getLanguage() { return this.currentLangSubject.value; }
}
