import { Injectable, NgZone, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  loadingGlobal = signal(false);
  loadingSection = signal(false);
  loadingNavigate = signal(false);

  constructor(private zone: NgZone){}
  
  showGlobalSpinner() {
    this.zone.run(() => {
      this.loadingGlobal.set(true);
    });
  }

  hideGlobalSpinner() {
    this.zone.run(() => {
      this.loadingGlobal.set(false);
    });
  }

  showSectionSpinner() {
    this.loadingSection.set(true)
  }

  hideSectionSpinner(){
    this.loadingSection.set(false)
  }

  showNavigateSpinner(){
    this.loadingNavigate.set(true)
  }

  hideNavigateSpinner(){
    this.loadingNavigate.set(false)
  }
}
