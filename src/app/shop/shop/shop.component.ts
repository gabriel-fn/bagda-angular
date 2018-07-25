import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Rpg, Item, Token } from '../../shared/interfaces';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { RpgService } from '../../rpg/rpg.service';
import { AuthService } from '../../auth/auth.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'eth-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  public items: Item[];
  public rpg: Rpg; 
  public rpgId: number; 
  public token: Token;

  private rpgInPainelSubscription: Subscription;
  private authUserSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private shopService: ShopService,
              private rpgService: RpgService,
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

  buy(itemId: number) {
    this.shopService.buy(itemId)
    .subscribe(
      (response: {error: boolean, message: string, data: Rpg}) => {
        if (!response.error) {
          this.rpgService.rpg(this.rpgId);
        } else {
          console.log(response);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
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
    this.authUserSubscription.unsubscribe();
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
