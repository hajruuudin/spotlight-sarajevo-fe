import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallEventCard } from './small-event-card';

describe('SmallEventCard', () => {
  let component: SmallEventCard;
  let fixture: ComponentFixture<SmallEventCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallEventCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallEventCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
