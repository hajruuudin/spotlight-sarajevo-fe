import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDateIcon } from './calendar-date-icon';

describe('CalendarDateIcon', () => {
  let component: CalendarDateIcon;
  let fixture: ComponentFixture<CalendarDateIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDateIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDateIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
