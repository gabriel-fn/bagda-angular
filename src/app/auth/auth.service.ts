import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';

import { Token, User } from '../shared/interfaces';
import { PasswordClient } from './classes/password-client';
import { HelperService } from '../shared/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string;
  public authUser: BehaviorSubject<Token>; 
  public seeAuthUser: Observable<Token>; 

  constructor(private http: HttpClient,
              private helperService: HelperService,
              private router: Router) { 
    console.log('auth service active');
    this.baseUrl = this.helperService.baseUrl;
    this.authUser = new BehaviorSubject(this.getToken());
    this.seeAuthUser = this.authUser.asObservable(); 
  }

  setToken(token: Token): void {
    localStorage.setItem('bagda_token', JSON.stringify(token));
  }

  getToken() {
    let token = localStorage.getItem('bagda_token');
    if (!token) {
      return null;
    }
    return JSON.parse(localStorage.getItem('bagda_token'));
  }

  authenticate(email, password): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/oauth/token`, new PasswordClient(email, password));
  }

  logout(): void {
    localStorage.removeItem('bagda_token');
    this.authUser.next(null);
    this.router.navigate(['login']);
    this.helperService.showInfo('Você está deslogado...');
  }

  forbiddenError() {
    this.helperService.showError('Você não está autorizado é realizar está ação!');
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/user`);
  }

}
