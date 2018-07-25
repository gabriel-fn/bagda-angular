import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { Rpg, Token } from '../shared/interfaces';
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
    if (this.token) {
      this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${rpgId}/user`)
      .subscribe(
        (rpg: Rpg) => this.rpgInPainel.next(rpg),
        (error: HttpErrorResponse) => console.log(error)
      );
    } else {
      this.http.get<Rpg>(`${this.baseUrl}/api/rpgs/${rpgId}`)
      .subscribe(
        (rpg: Rpg) => this.rpgInPainel.next(rpg),
        (error: HttpErrorResponse) => console.log(error)
      );
    }
  }

  register(rpgId: number): Observable<{error: boolean, message: string}> {
    return this.http.get<{error: boolean, message: string}>(`${this.baseUrl}/api/rpgs/${rpgId}/register`);
  }
}
