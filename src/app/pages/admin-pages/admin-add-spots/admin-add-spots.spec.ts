import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSpots } from './admin-add-spots';

describe('AdminAddSpots', () => {
  let component: AdminAddSpots;
  let fixture: ComponentFixture<AdminAddSpots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddSpots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddSpots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
