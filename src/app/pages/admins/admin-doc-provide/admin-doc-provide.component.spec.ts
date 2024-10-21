import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocProvideComponent } from './admin-doc-provide.component';

describe('AdminDocProvideComponent', () => {
  let component: AdminDocProvideComponent;
  let fixture: ComponentFixture<AdminDocProvideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDocProvideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDocProvideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
