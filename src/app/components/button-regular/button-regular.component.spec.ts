import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRegularComponent } from './button-regular.component';

describe('ButtonRegularComponent', () => {
  let component: ButtonRegularComponent;
  let fixture: ComponentFixture<ButtonRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRegularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
