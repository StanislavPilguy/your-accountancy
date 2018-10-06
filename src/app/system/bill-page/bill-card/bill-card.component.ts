import {Component, Input, OnInit} from '@angular/core';

import {Bill} from "../../shared/models/bill.model";

@Component({
  selector: 'pips-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  private dollar: number;
  private euro: number;

  constructor() { }

  ngOnInit() {
    this.dollar = this.bill.value / this.currency[0]['buy'];
    this.euro = this.bill.value / this.currency[1]['buy'];
  }

}
