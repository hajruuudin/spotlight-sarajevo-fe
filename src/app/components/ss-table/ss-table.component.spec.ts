import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsTableComponent } from './ss-table.component';

describe('SsTableComponent', () => {
  let component: SsTableComponent;
  let fixture: ComponentFixture<SsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
