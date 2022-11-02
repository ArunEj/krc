import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMasterListingComponent } from './product-master-listing.component';

describe('ProductMasterListingComponent', () => {
  let component: ProductMasterListingComponent;
  let fixture: ComponentFixture<ProductMasterListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMasterListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMasterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
