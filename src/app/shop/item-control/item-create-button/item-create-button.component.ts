import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { MatDialog } from '@angular/material';

import { Rpg } from '../../../shared/interfaces';
import { ItemCreateModalComponent } from './item-create-modal/item-create-modal.component';
import { HelperService } from '../../../shared/helper.service';

@Component({
  selector: 'eth-item-create-button',
  templateUrl: './item-create-button.component.html',
  styleUrls: ['./item-create-button.component.css']
})
export class ItemCreateButtonComponent implements OnInit {

  @Input('rpg') rpg: Rpg; 
  @Output() modalClose = new EventEmitter<boolean>();

  constructor(public helperService: HelperService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreate() {
    const dialogRef = this.dialog.open(ItemCreateModalComponent, {
      width: '1000px',
      data: {rpg: this.rpg}
    });
    dialogRef.beforeClose().subscribe(result => {
      this.modalClose.emit(true);
    });
  }

}
