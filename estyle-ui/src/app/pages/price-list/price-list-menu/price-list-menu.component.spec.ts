import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListMenuComponent } from './price-list-menu.component';

describe('PriceListMenuComponent', () => {
  let component: PriceListMenuComponent;
  let fixture: ComponentFixture<PriceListMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
