import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name: 'pipsFilter'
})

export class FilterPipe implements PipeTransform {
	transform(items: any, value: string, field: string): any {
		if (items.length === 0 || !value) {
			return items;
		}

		return items.filter((i) => {
			return i[field].toLowerCase().indexOf(value.toLowerCase()) > -1;
		});
	}

}