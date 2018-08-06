import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Rpg } from '../../shared/interfaces';
import { RpgService } from '../../rpg/rpg.service';
import { HelperService } from '../../shared/helper.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'eth-shop-control',
  templateUrl: './shop-control.component.html',
  styleUrls: ['./shop-control.component.css']
})
export class ShopControlComponent implements OnInit {

  public form: FormGroup;
  public rpgId: number; 
  public rpg: Rpg;

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private shopService: ShopService,
              private helperService: HelperService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rpg_id: [ null, [ Validators.required ] ],
      name: [ null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ] ],
      is_multiple_sale: [ null, [ Validators.required ] ],
    });

    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => {
      this.rpg = rpg;
      this.form.get('rpg_id').setValue(this.rpg.id);
    });

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }

  isFieldInvalid(field: string) {
    return this.form.get(field).invalid;
  }

  createShop() {
    if (this.form.valid && this.shopService.editShopValidate()) {
      this.helperService.showLoading();
      this.shopService.createShop(this.form.value)
      .subscribe(
        (response: {error: boolean, message: string}) => {
          this.helperService.showResponse(response);
          this.rpgService.rpg(this.rpgId);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.helperService.hideLoading();
        }
      );
    }
  }

  deleteShop(shopId: number) {
    if (this.form.valid && this.shopService.editShopValidate()) {
      /*this.helperService.showLoading();
      this.shopService.deleteShop(shopId)
      .subscribe(
        (response: {error: boolean, message: string}) => {
          this.helperService.showResponse(response);
          this.rpgService.rpg(this.rpgId);
          this.helperService.hideLoading();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.helperService.hideLoading();
        }
      );*/
    }
  }
  
  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
