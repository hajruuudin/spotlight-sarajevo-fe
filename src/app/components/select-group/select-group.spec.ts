import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroup } from './select-group';

describe('SelectGroup', () => {
  let component: SelectGroup;
  let fixture: ComponentFixture<SelectGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
