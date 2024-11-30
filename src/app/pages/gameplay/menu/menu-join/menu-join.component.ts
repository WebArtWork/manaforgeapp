import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-join',
  standalone: false,

  templateUrl: './menu-join.component.html',
  styleUrl: './menu-join.component.scss'
})
export class MenuJoinComponent {
	@Output() changeScreen = new EventEmitter<'welcome' | 'join' | 'create'>();

}
