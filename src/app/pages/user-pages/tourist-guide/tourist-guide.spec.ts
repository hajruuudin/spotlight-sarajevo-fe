import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristGuide } from './tourist-guide';

describe('TouristGuide', () => {
  let component: TouristGuide;
  let fixture: ComponentFixture<TouristGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
