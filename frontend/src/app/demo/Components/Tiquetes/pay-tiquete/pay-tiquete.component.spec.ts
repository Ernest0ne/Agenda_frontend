import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTiqueteComponent } from './pay-tiquete.component';

describe('PayTiqueteComponent', () => {
  let component: PayTiqueteComponent;
  let fixture: ComponentFixture<PayTiqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayTiqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTiqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
