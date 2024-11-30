import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	selector: 'app-gameplay',
	standalone: false,
	templateUrl: './gameplay.component.html',
	styleUrl: './gameplay.component.scss'
})
export class GameplayComponent {
	constructor(public us: UserService) {}
}
