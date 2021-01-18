import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFactorComponent } from './page-factor.component';

describe('PageFactorComponent', () => {
  let component: PageFactorComponent;
  let fixture: ComponentFixture<PageFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
