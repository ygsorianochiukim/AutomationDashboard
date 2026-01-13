import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateLogsRecord } from '../../Models/Dashboard/update-logs-record.model';
import { DashboardSummaryResponse } from '../../Models/Dashboard/summary-logs.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardOverview {
  private apiUrl  = `${environment.apiUrl}/automationdashboard`;

  constructor(private http: HttpClient) {}

  displayLogs(): Observable<DashboardOverview[]>{
    return this.http.get<DashboardOverview[]>(this.apiUrl);
  }
  UpdateLogs(post: UpdateLogsRecord): Observable<UpdateLogsRecord>{
    return this.http.put<UpdateLogsRecord>(`${this.apiUrl}/updateConversation`, post);
  }
  DashboardSummary(): Observable<DashboardSummaryResponse> 
  {
    return this.http.get<DashboardSummaryResponse>(`${this.apiUrl}/summary`);
  }
}
