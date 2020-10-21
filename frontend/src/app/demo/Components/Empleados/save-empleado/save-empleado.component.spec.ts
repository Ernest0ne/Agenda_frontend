import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEmpleadoComponent } from './save-empleado.component';

describe('SaveEmpleadoComponent', () => {
  let component: SaveEmpleadoComponent;
  let fixture: ComponentFixture<SaveEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
