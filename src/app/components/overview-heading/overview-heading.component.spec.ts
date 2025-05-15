import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewHeadingComponent } from './overview-heading.component';

describe('OverviewHeadingComponent', () => {
  let component: OverviewHeadingComponent;
  let fixture: ComponentFixture<OverviewHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
