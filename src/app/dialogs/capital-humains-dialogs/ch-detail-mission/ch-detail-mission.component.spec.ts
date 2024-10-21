import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChDetailMissionComponent } from './ch-detail-mission.component';

describe('ChDetailMissionComponent', () => {
  let component: ChDetailMissionComponent;
  let fixture: ComponentFixture<ChDetailMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChDetailMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChDetailMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
