import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  @ViewChild('backgroundImage') backgroundImage : ElementRef | null = null;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.backgroundImage) {
      const x = event.clientX;
      const y = event.clientY;
      const speed = 0.01;

      const moveX = (x - window.innerWidth / 2) * speed;
      const moveY = (y - window.innerHeight / 2) * speed;

      this.backgroundImage.nativeElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  }

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  

}
