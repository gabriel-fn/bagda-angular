import { Component, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { Rpg, Item, Shop } from '../../shared/interfaces';
import { RpgService } from '../../rpg/rpg.service';
import { HelperService } from '../../shared/helper.service';
import { ItemEditModalComponent } from '../item-edit-modal/item-edit-modal.component';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'eth-shop-control',
  templateUrl: './shop-control.component.html',
  styleUrls: ['./shop-control.component.css']
})
export class ShopControlComponent implements OnInit {

  public rpg: Rpg; 
  public shopId: number;
  public rpgId: number; 
  public filter: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'gold_price', 'cash_price', 'require_test', 'max_units', 'action'];
  dataSource;

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private rpgService: RpgService,
              public helperService: HelperService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => {
      this.rpg = rpg;
      this.dataSourceSync();
    });

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }

  applyFilter(filterValue: string) {
    this.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filter;
  }

  dataSourceSync() {
    this.dataSource = new MatTableDataSource<Item>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filter;
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
    const dialogRef = this.dialog.open(ItemEditModalComponent, {
      width: '1000px',
      data: {item: item}
    });

    dialogRef.beforeClose().subscribe(result => {
      console.log('The dialog was closed');
      this.rpgService.rpg(this.rpgId);
    });
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
