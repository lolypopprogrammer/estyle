import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseClothesComponent } from './browse-clothes.component';

describe('BrowseClothesComponent', () => {
  let component: BrowseClothesComponent;
  let fixture: ComponentFixture<BrowseClothesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseClothesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
