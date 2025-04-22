import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotDiscoverComponent } from './spot-discover.component';

describe('SpotDiscoverComponent', () => {
  let component: SpotDiscoverComponent;
  let fixture: ComponentFixture<SpotDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotDiscoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
