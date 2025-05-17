import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallTagLabelComponent } from './small-tag-label.component';

describe('SmallTagLabelComponent', () => {
  let component: SmallTagLabelComponent;
  let fixture: ComponentFixture<SmallTagLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallTagLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallTagLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
