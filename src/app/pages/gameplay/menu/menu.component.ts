import { Component } from '@angular/core';
import { ManaforgeService } from 'src/app/modules/manaforge/services/manaforge.service';

@Component({
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	standalone: false
})
export class MenuComponent {
	screen: 'welcome' | 'join' = 'welcome';

	constructor(public mgs: ManaforgeService) {}
}
