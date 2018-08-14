import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Rpg, Item, HttpSuccessResponse } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';
import { ValidateService } from '../shared/validate.service';

@Injectable()
export class ShopService {

  private baseUrl: string;

  constructor(private http: HttpClient,
              private validateService: ValidateService,
              private helperService: HelperService) { 
    this.baseUrl = this.helperService.baseUrl;
  }

  createItem(value): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/shops/items/create`, value);
  }

  deleteItem(itemId: number): Observable<HttpSuccessResponse> {
    return this.http.delete<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/shops/items/delete/${itemId}`);
  }

  updateItem(value): Observable<HttpSuccessResponse> {
    let input: FormData = new FormData();
    input.append('item_id', value.item_id);
    input.append('name', value.name);
    input.append('gold_price', value.gold_price);
    input.append('cash_price', value.cash_price);
    input.append('max_units', value.max_units);
    input.append('require_test', value.require_test);
    input.append('detail', value.detail);
    if (value.image !== null) {
      input.append('image', value.image);
    }
    return this.http.post<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/shops/items/update`, input);
  }

  createShop(value): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/shops/create`, value);
  }

  deleteShop(shopId: number): Observable<HttpSuccessResponse> {
    return this.http.delete<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/shops/delete/${shopId}`);
  }

  buy(itemId: number): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/items/buy`, {item_id: itemId});
  }

  buyValidate(item: Item, rpg: Rpg): boolean {
    return (this.validateService.id(item.id)
      && this.validateService.token() 
      && this.validateService.credential()
      && this.validateService.itemLimite(item)
      && this.validateService.itemPay(item, rpg.player)
    );
  }

  editShopValidate(): boolean{
    return (this.validateService.token() && this.validateService.master());
  }
}
