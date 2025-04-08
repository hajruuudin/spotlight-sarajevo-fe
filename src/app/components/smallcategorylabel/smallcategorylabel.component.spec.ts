import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallcategorylabelComponent } from './smallcategorylabel.component';

describe('SmallcategorylabelComponent', () => {
  let component: SmallcategorylabelComponent;
  let fixture: ComponentFixture<SmallcategorylabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallcategorylabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallcategorylabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
