import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quest-modal',
  templateUrl: './quest-modal.component.html',
  styleUrls: ['./quest-modal.component.css']
})
export class QuestModalComponent implements OnInit {

  @Input() quest: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
