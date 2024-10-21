import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEditMissionComponent } from './ch-edit-mission.component';

describe('ChEditMissionComponent', () => {
  let component: ChEditMissionComponent;
  let fixture: ComponentFixture<ChEditMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEditMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEditMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
