import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEmploiyeDotationComponent } from './ch-emploiye-dotation.component';

describe('ChEmploiyeDotationComponent', () => {
  let component: ChEmploiyeDotationComponent;
  let fixture: ComponentFixture<ChEmploiyeDotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEmploiyeDotationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEmploiyeDotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
