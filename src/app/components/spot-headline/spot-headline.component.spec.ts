import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotHeadlineComponent } from './spot-headline.component';

describe('SpotHeadlineComponent', () => {
  let component: SpotHeadlineComponent;
  let fixture: ComponentFixture<SpotHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotHeadlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
