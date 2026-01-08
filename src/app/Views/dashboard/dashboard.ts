import { Component, OnInit } from '@angular/core';
import { ConversationServices } from '../../Services/ConversationServices/conversation-services';
import { Logs } from '../../Models/LogsList/logs.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateLogsList } from '../../Models/LogsList/update-logs-list.model';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [ ConversationServices ]
})
export class Dashboard implements OnInit {

  LogsList: Logs[] = [];
  UpdateLogField: UpdateLogsList = {
    status: '',
    transfer_count_bot: 10,
    transfer_count_human:  10,
    conversation_id:  null,
  }
  logsID: number = 0;

  constructor(private LogsServices : ConversationServices, private router : Router) {}

  ngOnInit(): void {
    this.displayDashboard();
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
      transfer_count_bot: log.transfer_count_bot,
      transfer_count_human: log.transfer_count_human,
    };
    this.LogsServices.UpdateLogsList(payload).subscribe(() => {

    });
  }

}
