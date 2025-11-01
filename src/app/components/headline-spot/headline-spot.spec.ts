import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineSpot } from './headline-spot';

describe('HeadlineSpot', () => {
  let component: HeadlineSpot;
  let fixture: ComponentFixture<HeadlineSpot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlineSpot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadlineSpot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
