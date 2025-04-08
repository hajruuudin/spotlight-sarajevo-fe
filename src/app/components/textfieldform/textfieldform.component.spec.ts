import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextfieldformComponent } from './textfieldform.component';

describe('TextfieldformComponent', () => {
  let component: TextfieldformComponent;
  let fixture: ComponentFixture<TextfieldformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextfieldformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextfieldformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
