import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpotCard } from './search-spot-card';

describe('SearchSpotCard', () => {
  let component: SearchSpotCard;
  let fixture: ComponentFixture<SearchSpotCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSpotCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSpotCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
