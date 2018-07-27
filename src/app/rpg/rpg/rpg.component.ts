import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Subscription } from 'rxjs';

import { Rpg } from '../../shared/interfaces';
import { RpgService } from '../rpg.service';
import { HelperService } from '../../shared/helper.service';

@Component({
  selector: 'eth-rpg',
  templateUrl: './rpg.component.html',
  styleUrls: ['./rpg.component.css']
})
export class RpgComponent implements OnInit {

  public rpgs: Rpg[];

  private rpgsSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(public helperService: HelperService,
              private rpgService: RpgService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.url
    .subscribe(
      (urlSegments: UrlSegment[]) => {
        let url = urlSegments.reduce((url, urlSegment) => `${url}/${urlSegment}`, '');
        this.helperService.showLoading();
        this.rpgsSubscription = this.rpgService.rpgs(url)
        .subscribe(
          (response: Rpg[]) => { 
            this.rpgs = response;
            this.helperService.hideLoading();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.helperService.hideLoading();
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.rpgsSubscription.unsubscribe();
  }

}
