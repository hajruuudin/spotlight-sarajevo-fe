import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({ opacity: 0 })),
  ]),
]);

export const fadeInOutComponentsAnimation = trigger('fadeInOutComponents', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('50ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('50ms ease-out', style({ opacity: 0 })),
  ]),
]);
