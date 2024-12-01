import { Injectable } from '@angular/core';
import { Manaforge } from '../interfaces/manaforge.interface';
import { Manaforgeworld } from '../../manaforgeworld/interfaces/manaforgeworld.interface';
import { Manaforgestory } from '../../manaforgestory/interfaces/manaforgestory.interface';
import { Manaforgehero } from '../../manaforgehero/interfaces/manaforgehero.interface';
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
				name: 'manaforge'
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.__http = _http;

		this.get();

		this.filteredDocuments(this.manaforgesByAuthor);

		_http
			.get('/api/manaforgeworld/getpublic')
			.subscribe((worlds: Manaforgeworld[]) => {
				this.worlds = worlds;
			});
	}

	worlds: Manaforgeworld[];

	rootStories: Manaforgestory[];

	stories: Manaforgestory[];

	heroes: Manaforgehero[];

	hero: Record<string, Manaforgehero | null> = {};

	world: string;

	load(gameplay: Manaforge): void {
		if (gameplay.world === this.world) {
			return;
		}

		this.world = gameplay.world;

		this.__http
			.get('/api/manaforgestory/getpublic?world=' + this.world)
			.subscribe((stories: Manaforgestory[]) => {
				this.stories = stories;

				this.rootStories = stories.filter((s) => !!s.story);
			});

		this.__http
			.get('/api/manaforgehero/getpublic?world=' + this.world)
			.subscribe((heroes: Manaforgehero[]) => {
				this.heroes = heroes;

				for (const hero of heroes) {
					this.hero[hero._id] = hero;
				}
			});

		console.log(gameplay);
		// load all content, subscribe on sockets
	}

	private __http: HttpService;
}
