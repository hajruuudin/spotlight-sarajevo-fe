import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpotOverview } from './admin-spot-overview';

describe('AdminSpotOverview', () => {
  let component: AdminSpotOverview;
  let fixture: ComponentFixture<AdminSpotOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSpotOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSpotOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
