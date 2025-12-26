import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionHeader } from './collection-header';

describe('CollectionHeader', () => {
  let component: CollectionHeader;
  let fixture: ComponentFixture<CollectionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
