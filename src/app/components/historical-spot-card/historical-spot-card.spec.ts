import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalSpotCard } from './historical-spot-card';

describe('HistoricalSpotCard', () => {
  let component: HistoricalSpotCard;
  let fixture: ComponentFixture<HistoricalSpotCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalSpotCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalSpotCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
