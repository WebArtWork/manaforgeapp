import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ManaforgeschoolService } from '../../services/manaforgeschool.service';
import { Manaforgeschool } from '../../interfaces/manaforgeschool.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { manaforgeschoolFormComponents } from '../../formcomponents/manaforgeschool.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './schools.component.html',
	styleUrls: ['./schools.component.scss'],
	standalone: false
})
export class SchoolsComponent {
	world = this._router.url.includes('/schools/') ? this._router.url.replace('/schools/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('manaforgeschool', manaforgeschoolFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Manaforgeschool>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Manaforgeschool);

					this._manaforgeschoolService.create(created as Manaforgeschool);

					close();
				}
			});
		},
		update: (doc: Manaforgeschool): void => {
			this._form.modal<Manaforgeschool>(this.form, [], doc).then((updated: Manaforgeschool) => {
				this._core.copy(updated, doc);

				this._manaforgeschoolService.update(doc);
			});
		},
		delete: (doc: Manaforgeschool): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this manaforgeschool?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._manaforgeschoolService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Manaforgeschool): void => {
					this._form.modalUnique<Manaforgeschool>('manaforgeschool', 'url', doc);
				}
			},
			this.world ? {
				icon: 'auto_fix_high',
				hrefFunc: (doc: Manaforgeschool): string => {
					return `/spells/${this.world}/${doc._id}`;
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

	get rows(): Manaforgeschool[] {
		return this._manaforgeschoolService.manaforgeschools;
	}

	constructor(
		private _translate: TranslateService,
		private _manaforgeschoolService: ManaforgeschoolService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Manaforgeschool>(create ? [] : this.rows)
				.then((manaforgeschools: Manaforgeschool[]) => {
					if (create) {
						for (const manaforgeschool of manaforgeschools) {
							this._preCreate(manaforgeschool);

							this._manaforgeschoolService.create(manaforgeschool);
						}
					} else {
						for (const manaforgeschool of this.rows) {
							if (!manaforgeschools.find(
								localManaforgeschool => localManaforgeschool._id === manaforgeschool._id
							)) {
								this._manaforgeschoolService.delete(manaforgeschool);
							}
						}

						for (const manaforgeschool of manaforgeschools) {
							const localManaforgeschool = this.rows.find(
								localManaforgeschool => localManaforgeschool._id === manaforgeschool._id
							);

							if (localManaforgeschool) {
								this._core.copy(manaforgeschool, localManaforgeschool);

								this._manaforgeschoolService.update(localManaforgeschool);
							} else {
								this._preCreate(manaforgeschool);

								this._manaforgeschoolService.create(manaforgeschool);
							}
						}
					}
				});
		};
	}

	private _preCreate(manaforgeschool: Manaforgeschool): void {
		manaforgeschool.__created;

		if (this.world) {
			manaforgeschool.world = this.world;
		}
	}
}
