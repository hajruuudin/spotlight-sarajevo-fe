import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question-component',
  imports: [],
  templateUrl: './question-component.html',
  styleUrl: './question-component.css',
  host: {
    class: 'w-full'
  }
})
export class QuestionComponent {
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
    return this.isSelectedA ? 'bg-(--primary-500)' : 'bg-(--secondary-300)';
  }

  noButtonStyle() {
    return this.isSelectedB ? 'bg-(--primary-500)' : 'bg-(--secondary-300)';
  }
}
