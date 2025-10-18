import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransportOverview } from './admin-transport-overview';

describe('AdminTransportOverview', () => {
  let component: AdminTransportOverview;
  let fixture: ComponentFixture<AdminTransportOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTransportOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransportOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
