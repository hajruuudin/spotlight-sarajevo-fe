import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-day',
  imports: [NgClass],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.css'
})
export class CalendarDayComponent {
  @Input() day: any = {};
  @Input() isSelectedDay: boolean = false;
  @Output() daySelected: EventEmitter<string> = new EventEmitter<string>();

  onDayClicked() {
    this.daySelected.emit(this.day.queryDate);
  }
}
