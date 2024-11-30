import { Injectable } from '@angular/core';
import { Manaforgedungeon } from '../interfaces/manaforgedungeon.interface';
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
export class ManaforgedungeonService extends CrudService<Manaforgedungeon> {
	manaforgedungeons: Manaforgedungeon[] = this.getDocs();

	manaforgedungeonsByAuthor: Record<string, Manaforgedungeon[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'manaforgedungeon',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.manaforgedungeonsByAuthor);
	}
}
