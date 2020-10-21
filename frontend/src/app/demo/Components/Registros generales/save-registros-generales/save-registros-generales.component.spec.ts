import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRegistrosGeneralesComponent } from './save-registros-generales.component';

describe('SaveRegistrosGeneralesComponent', () => {
  let component: SaveRegistrosGeneralesComponent;
  let fixture: ComponentFixture<SaveRegistrosGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRegistrosGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRegistrosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
