import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Subscription } from 'rxjs';

import { Rpg } from '../../shared/interfaces';
import { RpgService } from '../rpg.service';

@Component({
  selector: 'eth-rpg',
  templateUrl: './rpg.component.html',
  styleUrls: ['./rpg.component.css']
})
export class RpgComponent implements OnInit {

  public rpgs: Rpg[];

  private rpgsSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(
      (urlSegments: UrlSegment[]) => {
        let url = urlSegments.reduce((url, urlSegment) => `${url}/${urlSegment}`, '');

        this.rpgsSubscription = this.rpgService.rpgs(url).subscribe(
          (response: Rpg[]) => {
            this.rpgs = response;
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );

      }
    );
  }

  ngOnDestroy(): void {
    this.rpgsSubscription.unsubscribe();
  }

}
