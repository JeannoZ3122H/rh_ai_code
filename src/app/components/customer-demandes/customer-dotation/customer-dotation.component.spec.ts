import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDotationComponent } from './customer-dotation.component';

describe('CustomerDotationComponent', () => {
  let component: CustomerDotationComponent;
  let fixture: ComponentFixture<CustomerDotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDotationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
