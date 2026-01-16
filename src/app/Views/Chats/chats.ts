import { Component, OnInit } from '@angular/core';
import { Logs } from '../../Models/LogsList/logs.model';
import { ConversationServices } from '../../Services/ConversationServices/conversation-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Updateleads } from '../../Models/LogsList/updateleads.model';
import { UpdateleadsRelationship } from '../../Models/LogsList/updateleads-relationship.model';

@Component({
  selector: 'app-chats',
  imports: [CommonModule, FormsModule , HttpClientModule],
  templateUrl: './chats.html',
  styleUrl: './chats.scss',
  providers: [ConversationServices]
})
export class Chats implements OnInit {
  
  LogsList: Logs[] = [];
  searchTerm: string = '';
  leadsStatusField: Updateleads = {
    customer_psid: "",
    lead_stage: "",
  }
  RelationshipStatusField: UpdateleadsRelationship = {
    customer_psid: "",
    relationship_stage: "",
  }
  constructor(private LogsServices : ConversationServices) {}

  ngOnInit(): void {
    this.displayChats();
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
  displayChats(){
    this.LogsServices.displayListLogs().subscribe((data) => {
      this.LogsList = data;
    })
  }
  updateLeadsStatus(logs:any){
    const payload = {
      lead_stage: logs.lead_stage,
      customer_psid: logs.customer_psid,
    };
    this.leadsStatusField.lead_stage = logs.lead_stage;
    this.leadsStatusField.customer_psid = logs.customer_psid;
    this.LogsServices.UpdateLeadsStatus(payload).subscribe(() => {

    })
  }
  updateLeadsRelationship(logs:any){
    const payload = {
      relationship_stage: logs.relationship_stage,
      customer_psid: logs.customer_psid,
    };
    this.RelationshipStatusField.relationship_stage = logs.relationship_stage;
    this.RelationshipStatusField.customer_psid = logs.customer_psid;
    this.LogsServices.UpdateRelationshipStatus(payload).subscribe(() => {
    
    })
  }
}
