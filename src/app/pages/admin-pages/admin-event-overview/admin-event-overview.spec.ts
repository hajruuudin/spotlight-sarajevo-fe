import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventOverview } from './admin-event-overview';

describe('AdminEventOverview', () => {
  let component: AdminEventOverview;
  let fixture: ComponentFixture<AdminEventOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEventOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
