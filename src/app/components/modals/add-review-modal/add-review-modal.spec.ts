import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewModal } from './add-review-modal';

describe('AddReviewModal', () => {
  let component: AddReviewModal;
  let fixture: ComponentFixture<AddReviewModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReviewModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReviewModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
