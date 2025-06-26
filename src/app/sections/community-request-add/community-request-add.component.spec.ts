import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityRequestAddComponent } from './community-request-add.component';

describe('CommunityRequestAddComponent', () => {
  let component: CommunityRequestAddComponent;
  let fixture: ComponentFixture<CommunityRequestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityRequestAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
