import { Injectable } from '@angular/core';
import { Manaforgeartifact } from '../interfaces/manaforgeartifact.interface';
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
export class ManaforgeartifactService extends CrudService<Manaforgeartifact> {
	manaforgeartifacts: Manaforgeartifact[] = this.getDocs();

	manaforgeartifactsByAuthor: Record<string, Manaforgeartifact[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'manaforgeartifact',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.manaforgeartifactsByAuthor);
	}
}
