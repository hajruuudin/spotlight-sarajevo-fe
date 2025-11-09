import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFilterSelector } from './category-filter-selector';

describe('CategoryFilterSelector', () => {
  let component: CategoryFilterSelector;
  let fixture: ComponentFixture<CategoryFilterSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFilterSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFilterSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
