import {Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';
import {DatePipe} from "@angular/common";

@Pipe({
	name: 'pipsMoment'
})

export class MomentPipe implements PipeTransform {

	transform(value: string, formatFrom: string, formatTo: string = 'DD.MM.YYYY' ): any {
		return moment(value, formatFrom).format(formatTo);
	}

}