import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTiqueteComponent } from './price-tiquete.component';

describe('PriceTiqueteComponent', () => {
  let component: PriceTiqueteComponent;
  let fixture: ComponentFixture<PriceTiqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceTiqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTiqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
