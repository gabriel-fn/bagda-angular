import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User, HttpSuccessResponse } from '../shared/interfaces';
import { HelperService } from '../shared/helper.service';

@Injectable()
export class UserService {

  private baseUrl: string;

  constructor(  private http: HttpClient,
                private helperService: HelperService  ) {
    this.baseUrl = this.helperService.baseUrl;
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/user`);
  }

  resetPassword(values): Observable<HttpSuccessResponse> {
    return this.http.put<HttpSuccessResponse>(`${this.baseUrl}/api/user/reset/password`, values);
  }
}
