import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesBuilderComponent } from './clothes-builder.component';

describe('ClothesBuilderComponent', () => {
  let component: ClothesBuilderComponent;
  let fixture: ComponentFixture<ClothesBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClothesBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothesBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
