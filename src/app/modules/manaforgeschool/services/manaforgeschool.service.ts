import { Injectable } from '@angular/core';
import { Manaforgeschool } from '../interfaces/manaforgeschool.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class ManaforgeschoolService extends CrudService<Manaforgeschool> {
	manaforgeschools: Manaforgeschool[] = this.getDocs();

	manaforgeschoolsByAuthor: Record<string, Manaforgeschool[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'manaforgeschool',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.manaforgeschoolsByAuthor);
	}
}
