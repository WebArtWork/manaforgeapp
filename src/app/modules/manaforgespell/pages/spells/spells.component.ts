import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ManaforgespellService } from '../../services/manaforgespell.service';
import { Manaforgespell } from '../../interfaces/manaforgespell.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { manaforgespellFormComponents } from '../../formcomponents/manaforgespell.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './spells.component.html',
	styleUrls: ['./spells.component.scss'],
	standalone: false
})
export class SpellsComponent {
	world = this._router.url.includes('/spells/') ? this._router.url.split('/')[2] : '';

	school = this._router.url.includes('/spells/') ? this._router.url.split('/')[3] : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('manaforgespell', manaforgespellFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Manaforgespell>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Manaforgespell);

					this._manaforgespellService.create(created as Manaforgespell);

					close();
				}
			});
		},
		update: (doc: Manaforgespell): void => {
			this._form.modal<Manaforgespell>(this.form, [], doc).then((updated: Manaforgespell) => {
				this._core.copy(updated, doc);

				this._manaforgespellService.update(doc);
			});
		},
		delete: (doc: Manaforgespell): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this manaforgespell?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._manaforgespellService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Manaforgespell): void => {
					this._form.modalUnique<Manaforgespell>('manaforgespell', 'url', doc);
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

	get rows(): Manaforgespell[] {
		return this._manaforgespellService.manaforgespells;
	}

	constructor(
		private _translate: TranslateService,
		private _manaforgespellService: ManaforgespellService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Manaforgespell>(create ? [] : this.rows)
				.then((manaforgespells: Manaforgespell[]) => {
					if (create) {
						for (const manaforgespell of manaforgespells) {
							this._preCreate(manaforgespell);

							this._manaforgespellService.create(manaforgespell);
						}
					} else {
						for (const manaforgespell of this.rows) {
							if (!manaforgespells.find(
								localManaforgespell => localManaforgespell._id === manaforgespell._id
							)) {
								this._manaforgespellService.delete(manaforgespell);
							}
						}

						for (const manaforgespell of manaforgespells) {
							const localManaforgespell = this.rows.find(
								localManaforgespell => localManaforgespell._id === manaforgespell._id
							);

							if (localManaforgespell) {
								this._core.copy(manaforgespell, localManaforgespell);

								this._manaforgespellService.update(localManaforgespell);
							} else {
								this._preCreate(manaforgespell);

								this._manaforgespellService.create(manaforgespell);
							}
						}
					}
				});
		};
	}

	private _preCreate(manaforgespell: Manaforgespell): void {
		manaforgespell.__created;

		if (this.world) {
			manaforgespell.world = this.world;
		}

		if (this.school) {
			manaforgespell.school = this.school;
		}
	}
}
