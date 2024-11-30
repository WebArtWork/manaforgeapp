import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ManaforgeartifactService } from '../../services/manaforgeartifact.service';
import { Manaforgeartifact } from '../../interfaces/manaforgeartifact.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { manaforgeartifactFormComponents } from '../../formcomponents/manaforgeartifact.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './artifacts.component.html',
	styleUrls: ['./artifacts.component.scss'],
	standalone: false
})
export class ArtifactsComponent {
	world = this._router.url.includes('/artifacts/') ? this._router.url.split('/')[2] : '';

	dungeon = this._router.url.includes('/artifacts/') ? this._router.url.split('/')[3] : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('manaforgeartifact', manaforgeartifactFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Manaforgeartifact>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Manaforgeartifact);

					this._manaforgeartifactService.create(created as Manaforgeartifact);

					close();
				}
			});
		},
		update: (doc: Manaforgeartifact): void => {
			this._form.modal<Manaforgeartifact>(this.form, [], doc).then((updated: Manaforgeartifact) => {
				this._core.copy(updated, doc);

				this._manaforgeartifactService.update(doc);
			});
		},
		delete: (doc: Manaforgeartifact): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this manaforgeartifact?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._manaforgeartifactService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Manaforgeartifact): void => {
					this._form.modalUnique<Manaforgeartifact>('manaforgeartifact', 'url', doc);
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

	get rows(): Manaforgeartifact[] {
		return this._manaforgeartifactService.manaforgeartifacts;
	}

	constructor(
		private _translate: TranslateService,
		private _manaforgeartifactService: ManaforgeartifactService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Manaforgeartifact>(create ? [] : this.rows)
				.then((manaforgeartifacts: Manaforgeartifact[]) => {
					if (create) {
						for (const manaforgeartifact of manaforgeartifacts) {
							this._preCreate(manaforgeartifact);

							this._manaforgeartifactService.create(manaforgeartifact);
						}
					} else {
						for (const manaforgeartifact of this.rows) {
							if (!manaforgeartifacts.find(
								localManaforgeartifact => localManaforgeartifact._id === manaforgeartifact._id
							)) {
								this._manaforgeartifactService.delete(manaforgeartifact);
							}
						}

						for (const manaforgeartifact of manaforgeartifacts) {
							const localManaforgeartifact = this.rows.find(
								localManaforgeartifact => localManaforgeartifact._id === manaforgeartifact._id
							);

							if (localManaforgeartifact) {
								this._core.copy(manaforgeartifact, localManaforgeartifact);

								this._manaforgeartifactService.update(localManaforgeartifact);
							} else {
								this._preCreate(manaforgeartifact);

								this._manaforgeartifactService.create(manaforgeartifact);
							}
						}
					}
				});
		};
	}

	private _preCreate(manaforgeartifact: Manaforgeartifact): void {
		manaforgeartifact.__created;

		if (this.world) {
			manaforgeartifact.world = this.world;
		}

		if (this.dungeon) {
			manaforgeartifact.dungeon = this.dungeon;
		}
	}
}
