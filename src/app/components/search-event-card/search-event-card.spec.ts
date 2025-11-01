import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventCard } from './search-event-card';

describe('SearchEventCard', () => {
  let component: SearchEventCard;
  let fixture: ComponentFixture<SearchEventCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEventCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEventCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
