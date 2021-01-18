import { TestBed } from '@angular/core/testing';

import { BrowseClothesService } from './browse-clothes.service';

describe('BrowseClothesService', () => {
  let service: BrowseClothesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowseClothesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
