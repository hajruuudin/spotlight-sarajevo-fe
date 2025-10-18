import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuideOverview } from './admin-guide-overview';

describe('AdminGuideOverview', () => {
  let component: AdminGuideOverview;
  let fixture: ComponentFixture<AdminGuideOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGuideOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGuideOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
