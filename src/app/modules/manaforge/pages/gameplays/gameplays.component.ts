import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ManaforgeService } from '../../services/manaforge.service';
import { Manaforge } from '../../interfaces/manaforge.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { manaforgeFormComponents } from '../../formcomponents/manaforge.formcomponents';

@Component({
	templateUrl: './gameplays.component.html',
	styleUrls: ['./gameplays.component.scss'],
	standalone: false
})
export class GameplaysComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('manaforge', manaforgeFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Manaforge>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Manaforge);

					this._manaforgeService.create(created as Manaforge);

					close();
				}
			});
		},
		update: (doc: Manaforge): void => {
			this._form.modal<Manaforge>(this.form, [], doc).then((updated: Manaforge) => {
				this._core.copy(updated, doc);

				this._manaforgeService.update(doc);
			});
		},
		delete: (doc: Manaforge): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this manaforge?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._manaforgeService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Manaforge): void => {
					this._form.modalUnique<Manaforge>('manaforge', 'url', doc);
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

	get rows(): Manaforge[] {
		return this._manaforgeService.manaforges;
	}

	constructor(
		private _translate: TranslateService,
		private _manaforgeService: ManaforgeService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Manaforge>(create ? [] : this.rows)
				.then((manaforges: Manaforge[]) => {
					if (create) {
						for (const manaforge of manaforges) {
							this._preCreate(manaforge);

							this._manaforgeService.create(manaforge);
						}
					} else {
						for (const manaforge of this.rows) {
							if (!manaforges.find(
								localManaforge => localManaforge._id === manaforge._id
							)) {
								this._manaforgeService.delete(manaforge);
							}
						}

						for (const manaforge of manaforges) {
							const localManaforge = this.rows.find(
								localManaforge => localManaforge._id === manaforge._id
							);

							if (localManaforge) {
								this._core.copy(manaforge, localManaforge);

								this._manaforgeService.update(localManaforge);
							} else {
								this._preCreate(manaforge);

								this._manaforgeService.create(manaforge);
							}
						}
					}
				});
		};
	}

	private _preCreate(manaforge: Manaforge): void {
		manaforge.__created;
	}
}
