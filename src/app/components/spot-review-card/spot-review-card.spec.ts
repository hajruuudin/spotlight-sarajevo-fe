import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotReviewCard } from './spot-review-card';

describe('SpotReviewCard', () => {
  let component: SpotReviewCard;
  let fixture: ComponentFixture<SpotReviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotReviewCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotReviewCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
