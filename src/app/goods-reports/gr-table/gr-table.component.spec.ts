import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrTableComponent } from './gr-table.component';

describe('GrTableComponent', () => {
  let component: GrTableComponent;
  let fixture: ComponentFixture<GrTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
