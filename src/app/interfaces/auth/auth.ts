import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit {
  protected backgroundImage!: HTMLElement;
  public language: 'en' | 'ba' = 'en';
  public languageIcon: string = '/assets/icons/EN.svg';

  constructor(
    public lang: LanguageService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.backgroundImage = this.el.nativeElement.querySelector("#backgroundImage")

    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
    } else {
      html.setAttribute('data-theme', 'dark');
    }

    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.language = savedLang as 'en' | 'ba';
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.backgroundImage) return;

    const { innerWidth, innerHeight } = window;
    const offsetX = (event.clientX / innerWidth - 0.5) * 10;
    const offsetY = (event.clientY / innerHeight - 0.5) * 10;

    this.renderer.setStyle(
      this.backgroundImage,
      'transform',
      `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1.05)`
    );
  }

  toggleTheme(): void {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  toggleLanguage() {
    const newLang = this.lang.getLanguage() === 'en' ? 'ba' : 'en';
    this.lang.setLanguage(newLang);
  }
}
