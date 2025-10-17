import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEvents } from './admin-add-events';

describe('AdminAddEvents', () => {
  let component: AdminAddEvents;
  let fixture: ComponentFixture<AdminAddEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
