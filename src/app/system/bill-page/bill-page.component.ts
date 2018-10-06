import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription} from "rxjs/index";
import {Observable} from "rxjs/Rx";

import {BillService} from "../shared/services/bill.service";
import {Bill} from "../shared/models/bill.model";

@Component({
  selector: 'pips-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  private sub1: Subscription;
  private sub2: Subscription;

  private currency: any;
  private bill: Bill;

 private isLoaded = false;

  constructor( private billService: BillService ) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [any, 'base_ccy']) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
