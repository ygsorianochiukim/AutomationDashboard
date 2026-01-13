import { Component, OnInit } from '@angular/core';
import { ConversationServices } from '../../Services/ConversationServices/conversation-services';
import { Logs } from '../../Models/LogsList/logs.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateLogsList } from '../../Models/LogsList/update-logs-list.model';
import { DashboardOverview } from '../../Services/Dashboard/dashboard-overview';
import { UpdateLogsRecord } from '../../Models/Dashboard/update-logs-record.model';
import { DashboardSummaryResponse } from '../../Models/Dashboard/summary-logs.model';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [ ConversationServices , DashboardOverview]
})
export class Dashboard implements OnInit {

  LogsList: Logs[] = [];
  UpdateLogField: UpdateLogsList = {
    status: '',
    transfer_count_bot: 10,
    transfer_count_human:  10,
    conversation_id:  null,
  }
  DashboardSummary: DashboardSummaryResponse | null = null;
  UpdateLogStatus: UpdateLogsRecord = {
    customer_psid: null,
    conversation_status: "OPEN",
  }
  searchTerm: string = '';
  logsID: number = 0;

  constructor(private LogsServices : ConversationServices, private LogsUpdateService : DashboardOverview) {}

  ngOnInit(): void {
    this.displayDashboard();
    this.displaySummary();
  }
  filteredLogs() {
    if (!this.searchTerm) {
        return this.LogsList;
    }

    const term = this.searchTerm.toLowerCase();

    return this.LogsList.filter((log: any) =>
        log.customer_psid?.toLowerCase().includes(term) ||
        log.status?.toLowerCase().includes(term) || 
        log.last_message?.toLowerCase().includes(term)
    );
  }
  displaySummary(){
    this.LogsUpdateService.DashboardSummary().subscribe((data: DashboardSummaryResponse) => {
      this.DashboardSummary = data;
    })
  }

  displayDashboard(){
    this.LogsServices.displayListLogsPending().subscribe((data) => {
      this.LogsList = data;
    });
  }

  updateHandoff(log: any){
    const payload = {
      conversation_id: log.conversation_id,
      status: log.status,
      transfer_count_bot: log.transfer_count_bot + 1,
      transfer_count_human: log.transfer_count_human,
      customer_psid: log.customer_psid,
    };
    debugger;
    this.UpdateLogStatus.customer_psid = payload.customer_psid;
    this.LogsServices.UpdateLogsList(payload).subscribe(() => {
      this.LogsUpdateService.UpdateLogs(this.UpdateLogStatus).subscribe(()=> {})
    });
  }

}
