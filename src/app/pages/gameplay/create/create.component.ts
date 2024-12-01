import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManaforgeService } from 'src/app/modules/manaforge/services/manaforge.service';
import { ManaforgePlayer } from 'src/app/modules/manaforge/interfaces/manaforge.interface';
import { UserService } from 'src/app/modules/user/services/user.service';
import { environment } from 'src/environments/environment';
import { CoreService, HttpService } from 'wacom';

@Component({
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
	standalone: false
})
export class CreateComponent {
	readonly url = environment.url;

	gameplay = this.mfs.doc(this._router.url.replace('/create/', ''));

	hero = '';

	name = '';

	players: Record<string, ManaforgePlayer> = {};

	player(id: string): ManaforgePlayer {
		return this.players[id] || ({} as ManaforgePlayer);
	}

	constructor(
		public mfs: ManaforgeService,
		private _http: HttpService,
		private _core: CoreService,
		private _router: Router,
		public us: UserService
	) {
		this._core.onComplete('manaforgeLoaded').then(this._load.bind(this));
	}

	config(): void {
		if (this.players[this.us.user._id]) {
			this.players[this.us.user._id].name = this.name;

			this.players[this.us.user._id].hero = this.hero;
		}

		const body = {
			_id: this.gameplay._id,
			hero: this.hero,
			name: this.name
		};

		this._http
			.post(
				'/api/manaforge/config',
				this.gameplay.author === this.us.user._id
					? {
							...body,
							world: this.gameplay.world,
							mana: this.gameplay.mana,
							story: this.gameplay.story
					  }
					: body
			)
			.subscribe((gameplay) => {
				if (gameplay) {
					this.gameplay = gameplay;
				}
			});
	}

	configAfterWhile(): void {
		this._core.afterWhile(this, this.config.bind(this));
	}

	start(): void {}

	private _load(): void {
		this.gameplay = this.mfs.doc(this._router.url.replace('/create/', ''));

		const player = this.gameplay.players.find(
			(p) => p.user === this.us.user._id
		);

		this.name = player?.name || '';

		this.hero = player?.hero || '';

		this.mfs.load(this.gameplay);

		for (const player of this.gameplay.players) {
			this.players[player.user] = player;
		}
	}
}
