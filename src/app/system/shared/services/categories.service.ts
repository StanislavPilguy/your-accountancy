import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {BaseApi} from "../../../shared/core/base-api";
import {Category} from "../models/category.model";


@Injectable()
export class CategoriesService extends BaseApi {
	constructor( public _http: HttpClient) {
		super (_http);
	}

	addCategory(category: Category): Observable<Category> {
		return this.post('categories', category);
	}

	getCategories(): Observable<Category[]> {
  	return this.get('categories');
	}

	updateCategory(category: Category): Observable<Category> {
		return this.put(`categories/${category.id}`, category);
	}

}