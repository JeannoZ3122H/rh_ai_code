import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChListProgrammeComponent } from './ch-list-programme.component';

describe('ChListProgrammeComponent', () => {
  let component: ChListProgrammeComponent;
  let fixture: ComponentFixture<ChListProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChListProgrammeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChListProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
