import { TestBed } from '@angular/core/testing';

import { IssueOverview } from './issue-overview';

describe('IssueOverview', () => {
  let service: IssueOverview;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueOverview);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
