import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotOverviewComponent } from './spot-overview.component';

describe('SpotOverviewComponent', () => {
  let component: SpotOverviewComponent;
  let fixture: ComponentFixture<SpotOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
