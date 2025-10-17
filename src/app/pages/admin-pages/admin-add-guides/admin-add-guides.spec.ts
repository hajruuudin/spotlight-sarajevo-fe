import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddGuides } from './admin-add-guides';

describe('AdminAddGuides', () => {
  let component: AdminAddGuides;
  let fixture: ComponentFixture<AdminAddGuides>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddGuides]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddGuides);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
