import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLoaderComponent } from './show-loader.component';

describe('ShowLoaderComponent', () => {
  let component: ShowLoaderComponent;
  let fixture: ComponentFixture<ShowLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
