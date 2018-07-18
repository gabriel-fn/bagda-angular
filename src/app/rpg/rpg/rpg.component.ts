import { Component, OnInit } from '@angular/core';

import { Subscription } from '../../../../node_modules/rxjs';

import { RpgService } from '../rpg.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { ActivatedRoute, UrlSegment } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'eth-rpg',
  templateUrl: './rpg.component.html',
  styleUrls: ['./rpg.component.css']
})
export class RpgComponent implements OnInit {

  public rpgs: any[];

  private rpgSubscription: Subscription;

  constructor(private rpgService: RpgService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe(
      (urlSegments: UrlSegment[]) => {
        let url = urlSegments.reduce((url, urlSegment) => `${url}/${urlSegment}`, '');

        this.rpgSubscription = this.rpgService.rpgs(url).subscribe(
          (response: any) => {
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
    this.rpgSubscription.unsubscribe();
  }

}
