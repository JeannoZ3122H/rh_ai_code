import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChDetailRuptureComponent } from './ch-detail-rupture.component';

describe('ChDetailRuptureComponent', () => {
  let component: ChDetailRuptureComponent;
  let fixture: ComponentFixture<ChDetailRuptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChDetailRuptureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChDetailRuptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
