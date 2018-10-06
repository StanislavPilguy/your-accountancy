import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {BaseApi} from "../../../shared/core/base-api";
import {Bill} from "../models/bill.model";



@Injectable()
export class BillService extends BaseApi {

	constructor( public _http: HttpClient ) {

		super(_http);

	}

	getBill(): Observable<Bill> {
		return this.get('bill');
	}

	updateBill(bill: Bill): Observable<Bill> {
		return this.put('bill', bill);
	}

	getCurrency(base_ccy: string = 'base_ccy'): Observable<any> {
		return this._http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
	}


}