import { Injectable } from '@angular/core';
import { Manaforgestory } from '../interfaces/manaforgestory.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class ManaforgestoryService extends CrudService<Manaforgestory> {
	manaforgestorys: Manaforgestory[] = this.getDocs();

	manaforgestorysByStory: Record<string, Manaforgestory[]> = {};

	manaforgestorysByWorld: Record<string, Manaforgestory[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'manaforgestory'
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.manaforgestorysByStory, 'story');

		this.filteredDocuments(this.manaforgestorysByWorld, 'world');
	}
}
