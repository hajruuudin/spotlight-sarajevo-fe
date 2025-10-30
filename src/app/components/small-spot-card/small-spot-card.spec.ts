import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSpotCard } from './small-spot-card';

describe('SmallSpotCard', () => {
  let component: SmallSpotCard;
  let fixture: ComponentFixture<SmallSpotCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallSpotCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSpotCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
