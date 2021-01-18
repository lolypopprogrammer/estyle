import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusErrorComponent } from './payment-status-error.component';

describe('PaymentStatusErrorComponent', () => {
  let component: PaymentStatusErrorComponent;
  let fixture: ComponentFixture<PaymentStatusErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentStatusErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStatusErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
