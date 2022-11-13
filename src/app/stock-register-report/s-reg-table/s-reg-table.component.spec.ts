import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SRegTableComponent } from './s-reg-table.component';

describe('SRegTableComponent', () => {
  let component: SRegTableComponent;
  let fixture: ComponentFixture<SRegTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SRegTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SRegTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
