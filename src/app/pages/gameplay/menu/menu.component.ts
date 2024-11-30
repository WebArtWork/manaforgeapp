import { Component } from '@angular/core';
import { Manaforge } from 'src/app/modules/manaforge/interfaces/manaforge.interface';
import { ManaforgeService } from 'src/app/modules/manaforge/services/manaforge.service';

@Component({
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	standalone: false
})
export class MenuComponent {
	screen: 'welcome' | 'join' | 'create' = 'welcome';

	constructor(public mgs: ManaforgeService) {}
}
