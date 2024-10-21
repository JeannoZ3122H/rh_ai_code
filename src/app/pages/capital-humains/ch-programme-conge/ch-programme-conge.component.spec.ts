import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChProgrammeCongeComponent } from './ch-programme-conge.component';

describe('ChProgrammeCongeComponent', () => {
  let component: ChProgrammeCongeComponent;
  let fixture: ComponentFixture<ChProgrammeCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChProgrammeCongeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChProgrammeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
