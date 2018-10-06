import {Component, Input} from '@angular/core';

@Component({
  selector: 'pips-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {

  @Input() currency: any;

  private date: Date = new Date();

}
