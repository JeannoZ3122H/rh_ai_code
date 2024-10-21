import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocProvideComponent } from './add-doc-provide.component';

describe('AddDocProvideComponent', () => {
  let component: AddDocProvideComponent;
  let fixture: ComponentFixture<AddDocProvideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDocProvideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDocProvideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
