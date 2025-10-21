// spinner.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  public visible$ = new BehaviorSubject(false);
  show() { this.visible$.next(true); }
  hide() { this.visible$.next(false); }
}
