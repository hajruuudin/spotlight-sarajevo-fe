import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotOverview } from './spot-overview';

describe('SpotOverview', () => {
  let component: SpotOverview;
  let fixture: ComponentFixture<SpotOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
