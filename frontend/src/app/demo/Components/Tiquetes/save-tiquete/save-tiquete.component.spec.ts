import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTiqueteComponent } from './save-tiquete.component';

describe('SaveTiqueteComponent', () => {
  let component: SaveTiqueteComponent;
  let fixture: ComponentFixture<SaveTiqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTiqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTiqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
