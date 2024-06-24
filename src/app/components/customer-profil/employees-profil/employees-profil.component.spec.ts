import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesProfilComponent } from './employees-profil.component';

describe('EmployeesProfilComponent', () => {
  let component: EmployeesProfilComponent;
  let fixture: ComponentFixture<EmployeesProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesProfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
