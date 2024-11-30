import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ManaforgeworldService } from '../../services/manaforgeworld.service';
import { Manaforgeworld } from '../../interfaces/manaforgeworld.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { manaforgeworldFormComponents } from '../../formcomponents/manaforgeworld.formcomponents';

@Component({
	templateUrl: './worlds.component.html',
	styleUrls: ['./worlds.component.scss'],
	standalone: false
})
export class WorldsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('manaforgeworld', manaforgeworldFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Manaforgeworld>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Manaforgeworld);

					this._manaforgeworldService.create(created as Manaforgeworld);

					close();
				}
			});
		},
		update: (doc: Manaforgeworld): void => {
			this._form.modal<Manaforgeworld>(this.form, [], doc).then((updated: Manaforgeworld) => {
				this._core.copy(updated, doc);

				this._manaforgeworldService.update(doc);
			});
		},
		delete: (doc: Manaforgeworld): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this manaforgeworld?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._manaforgeworldService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Manaforgeworld): void => {
					this._form.modalUnique<Manaforgeworld>('manaforgeworld', 'url', doc);
				}
			},
			{
				icon: 'sports_kabaddi',
				hrefFunc: (doc: Manaforgeworld): string => {
					return '/heroes/' + doc._id;
				}
			},
			{
				icon: 'school',
				hrefFunc: (doc: Manaforgeworld): string => {
					return '/schools/' + doc._id;
				}
			},
			{
				icon: 'fort',
				hrefFunc: (doc: Manaforgeworld): string => {
					return '/dungeons/' + doc._id;
				}
			}
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

	get rows(): Manaforgeworld[] {
		return this._manaforgeworldService.manaforgeworlds;
	}

	constructor(
		private _translate: TranslateService,
		private _manaforgeworldService: ManaforgeworldService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Manaforgeworld>(create ? [] : this.rows)
				.then((manaforgeworlds: Manaforgeworld[]) => {
					if (create) {
						for (const manaforgeworld of manaforgeworlds) {
							this._preCreate(manaforgeworld);

							this._manaforgeworldService.create(manaforgeworld);
						}
					} else {
						for (const manaforgeworld of this.rows) {
							if (!manaforgeworlds.find(
								localManaforgeworld => localManaforgeworld._id === manaforgeworld._id
							)) {
								this._manaforgeworldService.delete(manaforgeworld);
							}
						}

						for (const manaforgeworld of manaforgeworlds) {
							const localManaforgeworld = this.rows.find(
								localManaforgeworld => localManaforgeworld._id === manaforgeworld._id
							);

							if (localManaforgeworld) {
								this._core.copy(manaforgeworld, localManaforgeworld);

								this._manaforgeworldService.update(localManaforgeworld);
							} else {
								this._preCreate(manaforgeworld);

								this._manaforgeworldService.create(manaforgeworld);
							}
						}
					}
				});
		};
	}

	private _preCreate(manaforgeworld: Manaforgeworld): void {
		manaforgeworld.__created;
	}
}
