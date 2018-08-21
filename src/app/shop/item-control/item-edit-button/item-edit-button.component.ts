import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { MatDialog } from '@angular/material';

import { Item } from '../../../shared/interfaces';
import { ItemEditModalComponent } from './item-edit-modal/item-edit-modal.component';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'eth-item-edit-button',
  templateUrl: './item-edit-button.component.html',
  styleUrls: ['./item-edit-button.component.css']
})
export class ItemEditButtonComponent implements OnInit {

  @Input('item') item: Item; 
  @Output() modalClose = new EventEmitter<boolean>();

  constructor(public helperService: HelperService,
              public dialog: MatDialog) { }

  ngOnInit(): void { 
  }

  openEdit() {
    const dialogRef = this.dialog.open(ItemEditModalComponent, {
      width: '1000px',
      data: {item: this.item}
    });
    dialogRef.beforeClose().subscribe(result => {
      this.modalClose.emit(true);
    });
  }

}
