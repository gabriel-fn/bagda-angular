import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../shared/helper.service';

@Injectable()
export class UserService {

  private baseUrl: string;

  constructor(private helperService: HelperService,
              private http: HttpClient) { 
    console.log('user service active'); 
    this.baseUrl = this.helperService.baseUrl;
  }

}
