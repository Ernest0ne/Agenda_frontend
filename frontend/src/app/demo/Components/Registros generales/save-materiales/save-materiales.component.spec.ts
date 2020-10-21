import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMaterialesComponent } from './save-materiales.component';

describe('SaveMaterialesComponent', () => {
  let component: SaveMaterialesComponent;
  let fixture: ComponentFixture<SaveMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
