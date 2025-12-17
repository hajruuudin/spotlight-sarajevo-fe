import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionModal } from './edit-collection-modal';

describe('EditCollectionModal', () => {
  let component: EditCollectionModal;
  let fixture: ComponentFixture<EditCollectionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCollectionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCollectionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
