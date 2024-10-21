import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChRuptureContratComponent } from './ch-rupture-contrat.component';

describe('ChRuptureContratComponent', () => {
  let component: ChRuptureContratComponent;
  let fixture: ComponentFixture<ChRuptureContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChRuptureContratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChRuptureContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
