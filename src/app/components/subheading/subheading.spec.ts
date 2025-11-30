import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subheading } from './subheading';

describe('Subheading', () => {
  let component: Subheading;
  let fixture: ComponentFixture<Subheading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subheading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Subheading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
