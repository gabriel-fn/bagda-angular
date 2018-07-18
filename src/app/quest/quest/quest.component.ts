import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { QuestService } from '../quest.service';
import { QuestModalComponent } from '../quest-modal/quest-modal.component';

@Component({
  selector: 'eth-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {

  public quests: any[];

  @Input() ofRpg: number;

  private questSubscription: Subscription;

  constructor(private questService: QuestService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.questSubscription = this.questService.quests(this.ofRpg).subscribe(
      (response: any) => {
        this.quests = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  open(quest) {
    console.log(quest);
    const modalRef = this.modalService.open(
      QuestModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.componentInstance.quest = quest;
  }

  ngOnDestroy(): void {
    this.questSubscription.unsubscribe();
  }
}
