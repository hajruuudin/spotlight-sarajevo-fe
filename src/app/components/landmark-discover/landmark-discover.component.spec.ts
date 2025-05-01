import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkDiscoverComponent } from './landmark-discover.component';

describe('LandmarkDiscoverComponent', () => {
  let component: LandmarkDiscoverComponent;
  let fixture: ComponentFixture<LandmarkDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandmarkDiscoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandmarkDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
