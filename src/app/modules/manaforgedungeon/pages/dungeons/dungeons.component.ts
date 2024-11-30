import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ManaforgedungeonService } from '../../services/manaforgedungeon.service';
import { Manaforgedungeon } from '../../interfaces/manaforgedungeon.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { manaforgedungeonFormComponents } from '../../formcomponents/manaforgedungeon.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './dungeons.component.html',
	styleUrls: ['./dungeons.component.scss'],
	standalone: false
})
export class DungeonsComponent {
	world = this._router.url.includes('/dungeons/') ? this._router.url.replace('/dungeons/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('manaforgedungeon', manaforgedungeonFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Manaforgedungeon>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Manaforgedungeon);

					this._manaforgedungeonService.create(created as Manaforgedungeon);

					close();
				}
			});
		},
		update: (doc: Manaforgedungeon): void => {
			this._form.modal<Manaforgedungeon>(this.form, [], doc).then((updated: Manaforgedungeon) => {
				this._core.copy(updated, doc);

				this._manaforgedungeonService.update(doc);
			});
		},
		delete: (doc: Manaforgedungeon): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this manaforgedungeon?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._manaforgedungeonService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Manaforgedungeon): void => {
					this._form.modalUnique<Manaforgedungeon>('manaforgedungeon', 'url', doc);
				}
			},
			this.world ? {
				icon: 'category',
				hrefFunc: (doc: Manaforgedungeon): string => {
					return `/artifacts/${this.world}/${doc._id}`;
				}
			}: null
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		]
	};

	get rows(): Manaforgedungeon[] {
		return this._manaforgedungeonService.manaforgedungeons;
	}

	constructor(
		private _translate: TranslateService,
		private _manaforgedungeonService: ManaforgedungeonService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Manaforgedungeon>(create ? [] : this.rows)
				.then((manaforgedungeons: Manaforgedungeon[]) => {
					if (create) {
						for (const manaforgedungeon of manaforgedungeons) {
							this._preCreate(manaforgedungeon);

							this._manaforgedungeonService.create(manaforgedungeon);
						}
					} else {
						for (const manaforgedungeon of this.rows) {
							if (!manaforgedungeons.find(
								localManaforgedungeon => localManaforgedungeon._id === manaforgedungeon._id
							)) {
								this._manaforgedungeonService.delete(manaforgedungeon);
							}
						}

						for (const manaforgedungeon of manaforgedungeons) {
							const localManaforgedungeon = this.rows.find(
								localManaforgedungeon => localManaforgedungeon._id === manaforgedungeon._id
							);

							if (localManaforgedungeon) {
								this._core.copy(manaforgedungeon, localManaforgedungeon);

								this._manaforgedungeonService.update(localManaforgedungeon);
							} else {
								this._preCreate(manaforgedungeon);

								this._manaforgedungeonService.create(manaforgedungeon);
							}
						}
					}
				});
		};
	}

	private _preCreate(manaforgedungeon: Manaforgedungeon): void {
		manaforgedungeon.__created;

		if (this.world) {
			manaforgedungeon.world = this.world;
		}
	}
}
