import { Injectable } from '@angular/core';
import { Manaforge } from '../interfaces/manaforge.interface';
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
export class ManaforgeService extends CrudService<Manaforge> {
	manaforges: Manaforge[] = this.getDocs();

	manaforgesByAuthor: Record<string, Manaforge[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'manaforge',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.manaforgesByAuthor);
	}

	gameplayLoaded: string;

	load(gameplay: Manaforge): void {
		// load all content, subscribe on sockets
	}
}
