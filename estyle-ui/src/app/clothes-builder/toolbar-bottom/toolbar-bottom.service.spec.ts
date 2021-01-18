import { TestBed } from '@angular/core/testing';

import { ToolbarBottomService } from './toolbar-bottom.service';

describe('ToolbarBottomService', () => {
  let service: ToolbarBottomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarBottomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
