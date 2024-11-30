import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'wacom';

@Component({
	selector: 'app-menu-join',
	templateUrl: './menu-join.component.html',
	styleUrl: './menu-join.component.scss',
	standalone: false
})
export class MenuJoinComponent {
	@Output() changeScreen = new EventEmitter<'welcome' | 'join'>();

	code: string;

	constructor(private _http: HttpService, private _router: Router) {}

	setCode(code: string): void {
		this.code = code;
	}

	join(): void {
		this._http
			.post('/api/manaforge/join', {
				code: this.code
			})
			.subscribe((resp) => {
				if (resp) {
					this._router.navigateByUrl('/create/' + resp._id);
				}
			});
	}
}
