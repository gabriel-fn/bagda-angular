import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { Rpg, Token, HttpSuccessResponse } from '../shared/interfaces';
import { AuthService } from './../auth/auth.service';
import { HelperService } from '../shared/helper.service';

@Injectable()
export class RpgService {

  private baseUrl: string;
  private token: Token;
  public rpgInPainel: BehaviorSubject<Rpg>; 
  public seeRpgInPainel: Observable<Rpg>; 

  constructor(private authService: AuthService,
              private helperService: HelperService, 
              private http: HttpClient) { 
    console.log('rpg service active'); 
    this.rpgInPainel = new BehaviorSubject(null);
    this.seeRpgInPainel = this.rpgInPainel.asObservable();
    this.baseUrl = this.helperService.baseUrl;
    this.authService.seeAuthUser.subscribe((token: Token) => this.token = token);
  }

  rpgs(typeOfRpgList: string): Observable<Rpg[]> {
    if (typeOfRpgList === '/rpgs/user') {
      return this.http.get<Rpg[]>(`${this.baseUrl}/api/rpgs/user`);
    } else {
      return this.http.get<Rpg[]>(`${this.baseUrl}/api/rpgs`);
    }
  }

  rpg(rpgId: number): void {
    this.helperService.showLoading();
    if (this.token) {
      this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${rpgId}/user`)
      .subscribe(
        (rpg: Rpg) => this.rpgInPainel.next(rpg),
        (error: HttpErrorResponse) => console.log(error),
        () => this.helperService.hideLoading()
      );
    } else {
      this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${rpgId}`)
      .subscribe(
        (rpg: Rpg) => this.rpgInPainel.next(rpg),
        (error: HttpErrorResponse) => console.log(error),
        () => this.helperService.hideLoading()
      );
    }
  }

  register(rpgId: number): Observable<HttpSuccessResponse> {
    return this.http.get<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/${rpgId}/register`);
  }

  registerResponse(player_id: number, accept: boolean): Observable<HttpSuccessResponse> {
    return this.http.post<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/register/response`, {player_id: player_id, accept: accept});
  }

  update(value): Observable<HttpSuccessResponse> {
    let input: FormData = new FormData();
    input.append('rpg_id', value.rpg_id);
    input.append('name', value.name);
    input.append('gold_starter', value.gold_starter);
    input.append('cash_starter', value.cash_starter);
    input.append('is_public', value.is_public);
    if (value.image !== null) {
      input.append('image', value.image);
    }
    return this.http.post<HttpSuccessResponse>(`${this.baseUrl}/api/rpgs/update`, input);
  }
}
