import { TestBed } from '@angular/core/testing';

import { BookExistsValidatorService } from './book-exists-validator.service';

describe('BookExistsValidatorService', () => {
  let service: BookExistsValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookExistsValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
