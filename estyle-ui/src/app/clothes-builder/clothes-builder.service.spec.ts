import { TestBed } from '@angular/core/testing';

import { ClothesBuilderService } from './clothes-builder.service';

describe('ClothesBuilderService', () => {
  let service: ClothesBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothesBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
