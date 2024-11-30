import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ManaforgeService } from 'src/app/modules/manaforge/services/manaforge.service';

@Component({
	selector: 'app-menu-welcome',
	templateUrl: './menu-welcome.component.html',
	styleUrl: './menu-welcome.component.scss',
	standalone: false
})
export class MenuWelcomeComponent {
	@Output() changeScreen = new EventEmitter<'welcome' | 'join'>();

	constructor(
		private _manaforgeService: ManaforgeService,
		private _router: Router
	) {}

	create(): void {
		this._manaforgeService.create().subscribe((resp) => {
			this._router.navigateByUrl('/create/' + resp._id);
		});
	}
}
