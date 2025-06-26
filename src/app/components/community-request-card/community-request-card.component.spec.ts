import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityRequestCardComponent } from './community-request-card.component';

describe('CommunityRequestCardComponent', () => {
  let component: CommunityRequestCardComponent;
  let fixture: ComponentFixture<CommunityRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityRequestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
