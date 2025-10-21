import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit {
  protected backgroundImage!: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.backgroundImage = this.el.nativeElement.querySelector("#backgroundImage")
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

}
