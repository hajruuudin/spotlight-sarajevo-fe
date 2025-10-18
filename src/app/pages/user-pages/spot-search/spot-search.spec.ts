import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotSearch } from './spot-search';

describe('SpotSearch', () => {
  let component: SpotSearch;
  let fixture: ComponentFixture<SpotSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
