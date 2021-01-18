import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePersonalStyleComponent } from './page-personal-style.component';

describe('PagePersonalStyleComponent', () => {
  let component: PagePersonalStyleComponent;
  let fixture: ComponentFixture<PagePersonalStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePersonalStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePersonalStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
