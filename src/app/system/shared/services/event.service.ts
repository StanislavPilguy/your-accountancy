import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";

import {BaseApi} from "../../../shared/core/base-api";
import {PIPSEvent} from "../models/event.model";

@Injectable()
export class EventsService extends BaseApi {
	constructor(public _http: HttpClient) {
		super(_http);
	}

	addEvent(event: PIPSEvent): Observable<PIPSEvent> {
		return this.post('events', event);
	}

	getEvents(): Observable<PIPSEvent[]> {
		return this.get('events');
	}

}