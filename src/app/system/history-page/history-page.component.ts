import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs/Rx";

import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/event.service";
import {Category} from "../shared/models/category.model";
import {PIPSEvent} from "../shared/models/event.model";

@Component({
  selector: 'pips-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor( private categoriesService: CategoriesService,
               private eventsService: EventsService) { }

  private isLoaded = false;
  private s1: Subscription;

  private categories: Category[] = [];
  private events: PIPSEvent[] = [];

  public chartData = [];

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], PIPSEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
