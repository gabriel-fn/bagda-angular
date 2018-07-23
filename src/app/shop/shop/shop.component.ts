import { Component, OnInit, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Rpg, Item } from '../../shared/interfaces';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { RpgService } from '../../rpg/rpg.service';

@Component({
  selector: 'eth-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  public items: Item[];

  @Input() rpg: Rpg; 

  private rpgInPainelSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel.subscribe(
      (rpg: Rpg) => {
        this.rpg = rpg;
      }
    );
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
    this.rpgInPainelSubscription.unsubscribe();
  }

}
