import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  loadingGlobal = signal(false);
  loadingSection = signal(false);
  
  showGlobalSpinner() { 
    this.loadingGlobal.set(true); 
  }

  hideGlobalSpinner() { 
    this.loadingGlobal.set(false); 
  }

  showSectionSpinner() {
    this.loadingSection.set(true)
  }

  hideSectionSpinner(){
    this.loadingSection.set(false)
  }
}
