import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ManaforgestoryService } from '../../services/manaforgestory.service';
import { Manaforgestory } from '../../interfaces/manaforgestory.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { manaforgestoryFormComponents } from '../../formcomponents/manaforgestory.formcomponents';

@Component({
	templateUrl: './stories.component.html',
	styleUrls: ['./stories.component.scss'],
	standalone: false
})
export class StoriesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('manaforgestory', manaforgestoryFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Manaforgestory>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Manaforgestory);

					this._manaforgestoryService.create(created as Manaforgestory);

					close();
				}
			});
		},
		update: (doc: Manaforgestory): void => {
			this._form.modal<Manaforgestory>(this.form, [], doc).then((updated: Manaforgestory) => {
				this._core.copy(updated, doc);

				this._manaforgestoryService.update(doc);
			});
		},
		delete: (doc: Manaforgestory): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this manaforgestory?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._manaforgestoryService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Manaforgestory): void => {
					this._form.modalUnique<Manaforgestory>('manaforgestory', 'url', doc);
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

	get rows(): Manaforgestory[] {
		return this._manaforgestoryService.manaforgestorys;
	}

	constructor(
		private _translate: TranslateService,
		private _manaforgestoryService: ManaforgestoryService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Manaforgestory>(create ? [] : this.rows)
				.then((manaforgestorys: Manaforgestory[]) => {
					if (create) {
						for (const manaforgestory of manaforgestorys) {
							this._preCreate(manaforgestory);

							this._manaforgestoryService.create(manaforgestory);
						}
					} else {
						for (const manaforgestory of this.rows) {
							if (!manaforgestorys.find(
								localManaforgestory => localManaforgestory._id === manaforgestory._id
							)) {
								this._manaforgestoryService.delete(manaforgestory);
							}
						}

						for (const manaforgestory of manaforgestorys) {
							const localManaforgestory = this.rows.find(
								localManaforgestory => localManaforgestory._id === manaforgestory._id
							);

							if (localManaforgestory) {
								this._core.copy(manaforgestory, localManaforgestory);

								this._manaforgestoryService.update(localManaforgestory);
							} else {
								this._preCreate(manaforgestory);

								this._manaforgestoryService.create(manaforgestory);
							}
						}
					}
				});
		};
	}

	private _preCreate(manaforgestory: Manaforgestory): void {
		manaforgestory.__created;
	}
}
