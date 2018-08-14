import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { Rpg, Item, Shop, HttpSuccessResponse } from '../../shared/interfaces';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { RpgService } from '../../rpg/rpg.service';
import { ShopService } from '../shop.service';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'eth-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  public rpg: Rpg; 
  public rpgId: number; 
  public shopId: number;
  public filter: string;

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private shopService: ShopService,
              private rpgService: RpgService,
              private helperService: HelperService,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => this.rpg = rpg);

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }

  applyFilter(value) {
    this.filter = value;
  }

  get items() {
    if (this.rpg && this.rpg.shops && this.rpg.shops[0]) {
      if (!this.shopId) {
        this.shopId = this.rpg.shops[0].id;
      } 
      if (this.filter && this.filter.trim() != '') {
        return this.rpg.shops.find((shop: Shop) => this.shopId === shop.id).items
        .filter((item) => {
          return (item.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1);
        })
      }
      return this.rpg.shops.find((shop: Shop) => this.shopId === shop.id).items;
    } else {
      return null;
    }
  }

  buy(item: Item) {
    if (this.shopService.buyValidate(item, this.rpg)) {
      this.helperService.showLoading();
      this.shopService.buy(item.id)
      .subscribe(
        (response: HttpSuccessResponse) => {
          this.rpgService.rpg(this.rpgId);
          this.helperService.showResponse(response);
          this.helperService.hideLoading()
        },
        (error: HttpErrorResponse) => {
          this.helperService.hideLoading()
        }
      );
    }
  }

  open(item: Item) {
    this.dialog.open(ItemModalComponent, {
      width: '800px',
      data: {item: item}
    })
    .beforeClose()
    .subscribe((item: Item) => {
      if (item) {
        this.buy(item);
      }
    });
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
