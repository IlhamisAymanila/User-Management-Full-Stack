import { TestBed } from '@angular/core/testing';

import { UserMenageService } from './user-menage.service';

describe('UserMenageService', () => {
  let service: UserMenageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMenageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
