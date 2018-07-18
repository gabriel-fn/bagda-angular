import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';

import { PasswordClient } from './classes/password-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000';
  public authUser: BehaviorSubject<any>; 
  public seeAuthUser: Observable<any>; 

  constructor(private http: HttpClient,
              private router: Router) { console.log('auth service active'); }

  authenticate(email, password): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/oauth/token`, new PasswordClient(email, password));
  }

  logout() {
    this.authUser.next(null);
    this.router.navigate(['reports']);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/user`);
  }

}
