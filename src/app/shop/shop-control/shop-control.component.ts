import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Rpg, Item, Shop } from '../../shared/interfaces';
import { RpgService } from '../../rpg/rpg.service';
import { HelperService } from '../../shared/helper.service';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'eth-shop-control',
  templateUrl: './shop-control.component.html',
  styleUrls: ['./shop-control.component.css']
})
export class ShopControlComponent implements OnInit {

  public rpg: Rpg; 
  public shopId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'gold_price', 'cash_price', 'require_test', 'max_units', 'action'];
  dataSource;

  private rpgInPainelSubscription: Subscription;

  constructor(private rpgService: RpgService,
              public helperService: HelperService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => {
      this.rpg = rpg;
      this.dataSourceSync();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dataSourceSync() {
    this.dataSource = new MatTableDataSource<Item>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get items() {
    if (this.rpg.shops) {
      if (!this.shopId) {
        this.shopId = this.rpg.shops[0].id;
      } 
      return this.rpg.shops.find((shop: Shop) => this.shopId === shop.id).items;
    } else {
      return null;
    }
  }
  open(item: Item) {
    const modalRef = this.modalService.open(
      ItemModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.componentInstance.item = item;
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
  }

}
