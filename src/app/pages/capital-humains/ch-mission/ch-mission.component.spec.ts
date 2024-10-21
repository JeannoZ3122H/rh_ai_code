import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChMissionComponent } from './ch-mission.component';

describe('ChMissionComponent', () => {
  let component: ChMissionComponent;
  let fixture: ComponentFixture<ChMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
