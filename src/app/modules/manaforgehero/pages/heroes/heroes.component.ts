import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ManaforgeheroService } from '../../services/manaforgehero.service';
import { Manaforgehero } from '../../interfaces/manaforgehero.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { manaforgeheroFormComponents } from '../../formcomponents/manaforgehero.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss'],
	standalone: false
})
export class HeroesComponent {
	world = this._router.url.includes('/heroes/') ? this._router.url.replace('/heroes/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('manaforgehero', manaforgeheroFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Manaforgehero>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Manaforgehero);

					this._manaforgeheroService.create(created as Manaforgehero);

					close();
				}
			});
		},
		update: (doc: Manaforgehero): void => {
			this._form.modal<Manaforgehero>(this.form, [], doc).then((updated: Manaforgehero) => {
				this._core.copy(updated, doc);

				this._manaforgeheroService.update(doc);
			});
		},
		delete: (doc: Manaforgehero): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this manaforgehero?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._manaforgeheroService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Manaforgehero): void => {
					this._form.modalUnique<Manaforgehero>('manaforgehero', 'url', doc);
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

	get rows(): Manaforgehero[] {
		return this._manaforgeheroService.manaforgeheros;
	}

	constructor(
		private _translate: TranslateService,
		private _manaforgeheroService: ManaforgeheroService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Manaforgehero>(create ? [] : this.rows)
				.then((manaforgeheros: Manaforgehero[]) => {
					if (create) {
						for (const manaforgehero of manaforgeheros) {
							this._preCreate(manaforgehero);

							this._manaforgeheroService.create(manaforgehero);
						}
					} else {
						for (const manaforgehero of this.rows) {
							if (!manaforgeheros.find(
								localManaforgehero => localManaforgehero._id === manaforgehero._id
							)) {
								this._manaforgeheroService.delete(manaforgehero);
							}
						}

						for (const manaforgehero of manaforgeheros) {
							const localManaforgehero = this.rows.find(
								localManaforgehero => localManaforgehero._id === manaforgehero._id
							);

							if (localManaforgehero) {
								this._core.copy(manaforgehero, localManaforgehero);

								this._manaforgeheroService.update(localManaforgehero);
							} else {
								this._preCreate(manaforgehero);

								this._manaforgeheroService.create(manaforgehero);
							}
						}
					}
				});
		};
	}

	private _preCreate(manaforgehero: Manaforgehero): void {
		manaforgehero.__created;

		if (this.world) {
			manaforgehero.world = this.world;
		}
	}
}
