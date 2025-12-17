import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCollectionModal } from './delete-collection-modal';

describe('DeleteCollectionModal', () => {
  let component: DeleteCollectionModal;
  let fixture: ComponentFixture<DeleteCollectionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCollectionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCollectionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
