import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHeadlineComponent } from './event-headline.component';

describe('EventHeadlineComponent', () => {
  let component: EventHeadlineComponent;
  let fixture: ComponentFixture<EventHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventHeadlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
