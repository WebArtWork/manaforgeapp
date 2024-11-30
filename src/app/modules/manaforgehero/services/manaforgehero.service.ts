import { Injectable } from '@angular/core';
import { Manaforgehero } from '../interfaces/manaforgehero.interface';
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
export class ManaforgeheroService extends CrudService<Manaforgehero> {
	manaforgeheros: Manaforgehero[] = this.getDocs();

	manaforgeherosByAuthor: Record<string, Manaforgehero[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'manaforgehero',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.manaforgeherosByAuthor);
	}
}
