import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRuptureContratComponent } from './customer-rupture-contrat.component';

describe('CustomerRuptureContratComponent', () => {
  let component: CustomerRuptureContratComponent;
  let fixture: ComponentFixture<CustomerRuptureContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRuptureContratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRuptureContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
