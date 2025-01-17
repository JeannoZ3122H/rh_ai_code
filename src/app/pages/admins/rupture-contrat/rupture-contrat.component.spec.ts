import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuptureContratComponent } from './rupture-contrat.component';

describe('RuptureContratComponent', () => {
  let component: RuptureContratComponent;
  let fixture: ComponentFixture<RuptureContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuptureContratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuptureContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
