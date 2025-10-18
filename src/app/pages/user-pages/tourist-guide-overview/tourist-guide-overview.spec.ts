import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristGuideOverview } from './tourist-guide-overview';

describe('TouristGuideOverview', () => {
  let component: TouristGuideOverview;
  let fixture: ComponentFixture<TouristGuideOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristGuideOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristGuideOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
