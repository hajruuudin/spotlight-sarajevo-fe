import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReviewModalComponent } from './delete-review-modal.component';

describe('DeleteReviewModalComponent', () => {
  let component: DeleteReviewModalComponent;
  let fixture: ComponentFixture<DeleteReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteReviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
