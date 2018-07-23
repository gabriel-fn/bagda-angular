import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { Rpg, Token, Player } from '../shared/interfaces';
import { AuthService } from './../auth/auth.service';
import { HelperService } from '../shared/helper.service';

@Injectable()
export class RpgService {

  private baseUrl: string;
  public rpgInPainel: BehaviorSubject<Rpg>; 
  public seeRpgInPainel: Observable<Rpg>; 

  constructor(private authService: AuthService,
              private helperService: HelperService, 
              private http: HttpClient) { 
    console.log('rpg service active'); 
    this.rpgInPainel = new BehaviorSubject(null);
    this.seeRpgInPainel = this.rpgInPainel.asObservable();
    this.baseUrl = this.helperService.baseUrl;
  }

  rpgs(typeOfRpgList: string): Observable<Rpg[]> {
    if (typeOfRpgList === '/rpgs/user') {
      return this.http.get<Rpg[]>(`${this.baseUrl}/api/rpgs/user`);
    } else {
      return this.http.get<Rpg[]>(`${this.baseUrl}/api/rpgs`);
    }
  }

  rpg(id: number): Observable<Rpg> {
    let token: Token = this.authService.authUser.getValue();
    if (token) {
      return this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${id}/user`);
    } else {
      return this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${id}`);
    }
  }

  register(rpgId: number): Observable<Rpg> {
    let token: Token = this.authService.authUser.getValue();
    if (token) {
      return this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${rpgId}/register`);
    }
  }
}
