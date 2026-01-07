import { TestBed } from '@angular/core/testing';

import { DashboardOverview } from './dashboard-overview';

describe('DashboardOverview', () => {
  let service: DashboardOverview;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardOverview);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
