import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Rpg, Item } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';
import { ValidateService } from '../shared/validate.service';

@Injectable()
export class ShopService {

  private baseUrl: string;

  constructor(private http: HttpClient,
              private validateService: ValidateService,
              private helperService: HelperService) { 
    console.log('shops service active'); 
    this.baseUrl = this.helperService.baseUrl;
  }

  updateItem(value): Observable<{error: boolean, message: string}> {
    let input: FormData = new FormData();
    input.append('item_id', value.item_id);
    input.append('name', value.name);
    input.append('gold_price', value.gold_price);
    input.append('cash_price', value.cash_price);
    input.append('max_units', value.max_units);
    input.append('require_test', value.require_test);
    input.append('detail', value.detail);
    console.log('value.image');
    if (value.image !== null) {
      input.append('image', value.image);
    }
    return this.http.post<{error: boolean, message: string}>(`${this.baseUrl}/api/items/update`, input);
  }

  createShop(value): Observable<{error: boolean, message: string}> {
    return this.http.put<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/shops/create`, value);
  }

  buy(itemId: number): Observable<{error: boolean, message: string}> {
    return this.http.put<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/items/buy`, {item_id: itemId});
  }

  buyValidate(item: Item, rpg: Rpg): boolean {
    return (this.validateService.id(item.id)
      && this.validateService.token() 
      && this.validateService.credential(rpg)
      && this.validateService.itemLimite(item)
      && this.validateService.itemPay(item, rpg.player)
    );
  }
}
