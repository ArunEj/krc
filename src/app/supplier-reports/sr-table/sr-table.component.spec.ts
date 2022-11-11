import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrTableComponent } from './sr-table.component';

describe('SrTableComponent', () => {
  let component: SrTableComponent;
  let fixture: ComponentFixture<SrTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
