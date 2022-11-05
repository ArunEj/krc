import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReportsComponent } from './goods-reports.component';

describe('GoodsReportsComponent', () => {
  let component: GoodsReportsComponent;
  let fixture: ComponentFixture<GoodsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
