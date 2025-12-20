import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCollectionModal } from './add-to-collection-modal';

describe('AddToCollectionModal', () => {
  let component: AddToCollectionModal;
  let fixture: ComponentFixture<AddToCollectionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCollectionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCollectionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
