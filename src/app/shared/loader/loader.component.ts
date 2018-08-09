import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { LoaderService } from './loader.service';

@Component({
  selector: 'eth-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public show: boolean = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() { 
    this.subscription = this.loaderService.loaderState
    .subscribe((state: boolean) => this.show = state);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
