import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';

@Component({
  selector: 'app-question-component',
  imports: [],
  templateUrl: './question-component.component.html',
  styleUrl: './question-component.component.css'
})
export class QuestionComponentComponent {
  @Input() isSelectedA: boolean = false;
  @Input() isSelectedB: boolean = false;
  @Input() question: string = "";
  @Output() isSelectedAChanged = new EventEmitter<boolean>();
  @Output() isSelectedBChanged = new EventEmitter<boolean>();


  onYesClick() {
    this.isSelectedA = true;
    this.isSelectedAChanged.emit(this.isSelectedA);
    this.isSelectedB = false;
    this.isSelectedBChanged.emit(this.isSelectedB);
  }

  onNoClick() {
    this.isSelectedB = true;
    this.isSelectedBChanged.emit(this.isSelectedB);
    this.isSelectedA = false;
    this.isSelectedAChanged.emit(this.isSelectedA);
  }


  yesButtonStyle() {
    return this.isSelectedA ? 'bg-cyan-400 text-white' : 'bg-cyan-800 text-white';
  }

  noButtonStyle() {
    return this.isSelectedB ? 'bg-cyan-400 text-white' : 'bg-cyan-800 text-white';
  }
}