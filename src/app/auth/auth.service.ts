import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';

import { Token, User } from '../shared/interfaces';
import { PasswordClient } from './classes/password-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000';
  public authUser: BehaviorSubject<Token>; 
  public seeAuthUser: Observable<Token>; 

  constructor(private http: HttpClient,
              private router: Router) { 
    console.log('auth service active'); 
  }

  authenticate(email, password): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/oauth/token`, new PasswordClient(email, password));
  }

  logout() {
    this.authUser.next(null);
    this.router.navigate(['rpgs']);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/user`);
  }

}
