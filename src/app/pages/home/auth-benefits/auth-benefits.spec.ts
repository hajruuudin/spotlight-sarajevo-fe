import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBenefits } from './auth-benefits';

describe('AuthBenefits', () => {
  let component: AuthBenefits;
  let fixture: ComponentFixture<AuthBenefits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthBenefits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthBenefits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
