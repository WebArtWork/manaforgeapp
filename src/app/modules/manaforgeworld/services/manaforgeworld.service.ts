import { Injectable } from '@angular/core';
import { Manaforgeworld } from '../interfaces/manaforgeworld.interface';
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
export class ManaforgeworldService extends CrudService<Manaforgeworld> {
	manaforgeworlds: Manaforgeworld[] = this.getDocs();

	manaforgeworldsByAuthor: Record<string, Manaforgeworld[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'manaforgeworld',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.manaforgeworldsByAuthor);
	}
}
