import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristGuideCard } from './tourist-guide-card';

describe('TouristGuideCard', () => {
  let component: TouristGuideCard;
  let fixture: ComponentFixture<TouristGuideCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristGuideCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristGuideCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
