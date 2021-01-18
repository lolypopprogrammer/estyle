import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClotheInfoComponent } from './clothe-info.component';

describe('ClotheInfoComponent', () => {
  let component: ClotheInfoComponent;
  let fixture: ComponentFixture<ClotheInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClotheInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClotheInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
