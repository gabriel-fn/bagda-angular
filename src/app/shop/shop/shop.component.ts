import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Rpg, Item } from '../../shared/interfaces';
import { ShopService } from './../shop.service';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'eth-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  public items: Item[];

  @Input() rpg: Rpg; 
  //@Input() ofRpg: number = null;
  //@Input() pageSize: number = 5;
  //@Input() page: number = 1;

  //private shopSubscription: Subscription;

  constructor(//private shopService: ShopService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    /*this.shopSubscription = this.shopService.shops(this.ofRpg).subscribe(
      (response: Rpg) => {
        this.rpg = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );*/
  }

  open(item: Item) {
    const modalRef = this.modalService.open(
      ItemModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.componentInstance.item = item;
  }

  ngOnDestroy(): void {
    //this.shopSubscription.unsubscribe();
  }

}
