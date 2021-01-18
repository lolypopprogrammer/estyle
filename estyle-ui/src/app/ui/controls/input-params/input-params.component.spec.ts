import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputParamsComponent } from './input-params.component';

describe('InputParamsComponent', () => {
  let component: InputParamsComponent;
  let fixture: ComponentFixture<InputParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
