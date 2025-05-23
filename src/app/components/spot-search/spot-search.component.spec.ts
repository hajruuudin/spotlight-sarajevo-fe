import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotSearchComponent } from './spot-search.component';

describe('SpotSearchComponent', () => {
  let component: SpotSearchComponent;
  let fixture: ComponentFixture<SpotSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
