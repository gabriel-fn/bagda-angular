import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { Item } from '../../../shared/interfaces';

@Component({
  selector: 'eth-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit {

  public item: Item;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {item: Item}) { }

  ngOnInit() {
    this.item = this.data.item;
  }

}
