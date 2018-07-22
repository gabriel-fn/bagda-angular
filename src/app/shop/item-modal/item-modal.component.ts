import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Item } from '../../shared/interfaces';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit {

  @Input() item: Item;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
