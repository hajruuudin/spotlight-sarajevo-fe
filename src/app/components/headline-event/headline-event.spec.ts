import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineEvent } from './headline-event';

describe('HeadlineEvent', () => {
  let component: HeadlineEvent;
  let fixture: ComponentFixture<HeadlineEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlineEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadlineEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
