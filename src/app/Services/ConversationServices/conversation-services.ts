import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Logs } from '../../Models/LogsList/logs.model';
import { Observable } from 'rxjs';
import { UpdateLogsList } from '../../Models/LogsList/update-logs-list.model';
import { Updateleads } from '../../Models/LogsList/updateleads.model';
import { UpdateleadsRelationship } from '../../Models/LogsList/updateleads-relationship.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationServices {
  private apiUrl  = `${environment.apiUrl}/conversation`;

  constructor(private http: HttpClient) {}

  displayListLogs(): Observable<Logs[]>{
    return this.http.get<Logs[]>(`${this.apiUrl}`);
  }
  displayListLogsPending(): Observable<Logs[]>{
    return this.http.get<Logs[]>(`${this.apiUrl}/logs`);
  }

  UpdateLogsList(data: UpdateLogsList):Observable<UpdateLogsList>{
    return this.http.put<UpdateLogsList>(`${this.apiUrl}/update` , data)
  }

  UpdateLeadsStatus(data: Updateleads):Observable<Updateleads>{
    return this.http.put<Updateleads>(`${this.apiUrl}/updateLeadStatus` , data)
  }
  UpdateRelationshipStatus(data: UpdateleadsRelationship):Observable<UpdateleadsRelationship>{
    return this.http.put<UpdateleadsRelationship>(`${this.apiUrl}/updateLeadsRelationship` , data)
  }
}
