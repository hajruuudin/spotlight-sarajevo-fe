import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonGroup } from './radio-button-group';

describe('RadioButtonGroup', () => {
  let component: RadioButtonGroup;
  let fixture: ComponentFixture<RadioButtonGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
