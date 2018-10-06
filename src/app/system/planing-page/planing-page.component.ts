import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs/Rx";

import {BillService} from "../shared/services/bill.service";
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/event.service";
import {Bill} from "../shared/models/bill.model";
import {Category} from "../shared/models/category.model";
import {PIPSEvent} from "../shared/models/event.model";

@Component({
  selector: 'pips-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {


  private isLoaded = false;
  private s1: Subscription;


  private bill: Bill;
  categories: Category[] = [];
  private events: PIPSEvent[] = [];

  constructor(private billService: BillService,
              private categoriesService: CategoriesService,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], PIPSEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPersent(cat: Category): number {
    const persent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return persent > 100 ? 100 : persent;
  }

  getCatPersent(cat: Category): string {
    return this.getPersent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const persent = this.getPersent(cat);
    return persent < 60 ? 'success' : persent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }
}
