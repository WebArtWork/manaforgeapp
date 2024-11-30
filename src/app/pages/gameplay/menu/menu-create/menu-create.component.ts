import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-create',
  standalone: false,

  templateUrl: './menu-create.component.html',
  styleUrl: './menu-create.component.scss'
})
export class MenuCreateComponent {
	@Output() changeScreen = new EventEmitter<'welcome' | 'join' | 'create'>();

}
