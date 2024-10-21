import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChListMissionComponent } from './ch-list-mission.component';

describe('ChListMissionComponent', () => {
  let component: ChListMissionComponent;
  let fixture: ComponentFixture<ChListMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChListMissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChListMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
