import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Rpg, Item, Token, Shop } from '../../shared/interfaces';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { RpgService } from '../../rpg/rpg.service';
import { AuthService } from '../../auth/auth.service';
import { ShopService } from '../shop.service';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'eth-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  public token: Token;
  public rpg: Rpg; 
  public rpgId: number; 
  public shopId: number;

  private rpgInPainelSubscription: Subscription;
  private authUserSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private shopService: ShopService,
              private rpgService: RpgService,
              private helperService: HelperService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => this.rpg = rpg);

    this.authUserSubscription = this.authService.seeAuthUser
    .subscribe((token: Token) => this.token = token);

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }

  get items() {
    if (this.rpg.shops) {
      if (!this.shopId) {
        this.shopId = this.rpg.shops[0].id;
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
        (response: {error: boolean, message: string}) => {
          this.helperService.showResponse(response);
          this.rpgService.rpg(this.rpgId);
        },
        (error: HttpErrorResponse) => console.log(error),
        () => this.helperService.hideLoading()
      );
    }
  }

  open(item: Item) {
    const modalRef = this.modalService.open(
      ItemModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.result.then((item: Item) => this.buy(item), (dismiss) => {});
    modalRef.componentInstance.item = item;
  }

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
