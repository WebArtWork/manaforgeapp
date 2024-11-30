import { Injectable } from '@angular/core';
import { Manaforgespell } from '../interfaces/manaforgespell.interface';
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
export class ManaforgespellService extends CrudService<Manaforgespell> {
	manaforgespells: Manaforgespell[] = this.getDocs();

	manaforgespellsByAuthor: Record<string, Manaforgespell[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'manaforgespell',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.manaforgespellsByAuthor);
	}
}
