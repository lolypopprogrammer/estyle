import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneToOneSessionComponent } from './one-to-one-session.component';

describe('OneToOneSessionComponent', () => {
  let component: OneToOneSessionComponent;
  let fixture: ComponentFixture<OneToOneSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneToOneSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneToOneSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
