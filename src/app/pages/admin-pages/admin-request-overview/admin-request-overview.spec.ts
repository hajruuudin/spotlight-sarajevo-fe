import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestOverview } from './admin-request-overview';

describe('AdminRequestOverview', () => {
  let component: AdminRequestOverview;
  let fixture: ComponentFixture<AdminRequestOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRequestOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
