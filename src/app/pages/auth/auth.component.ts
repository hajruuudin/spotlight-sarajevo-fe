import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{
  parallaxBg: ElementRef | null = null;
  parallaxFg: ElementRef | null = null;

  ngAfterViewInit(): void {
    this.parallaxBg = this.el.nativeElement.querySelector('#parallaxBg');
    this.parallaxFg = this.el.nativeElement.querySelector('#parallaxFg');
    document.addEventListener('mousemove', this.parallax);
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.parallax); // Clean up the event listener
  }

  parallax = (event: MouseEvent) => {
    const amountBg = 20;
    const amountFg = 10;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const offsetXBg = (mouseX - centerX) / centerX * amountBg;
    const offsetYBg = (mouseY - centerY) / centerY * amountBg;

    const offsetxFg = (mouseX - centerX) / centerX * amountFg;
    const offsetYFg = (mouseY - centerY) / centerY * amountFg;

    if (this.parallaxBg) {
      this.renderer.setStyle(this.parallaxBg, 'transform', `translate(${offsetXBg}px, ${offsetYBg}px)`);
    }

    if (this.parallaxFg) {
      this.renderer.setStyle(this.parallaxFg, 'transform', `translate(${offsetxFg}px, ${offsetYFg}px)`);
    }
  };

  loginForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
