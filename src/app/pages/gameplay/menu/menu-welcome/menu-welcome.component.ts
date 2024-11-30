import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-welcome',
  standalone: false,

  templateUrl: './menu-welcome.component.html',
  styleUrl: './menu-welcome.component.scss'
})
export class MenuWelcomeComponent {
	@Output() changeScreen = new EventEmitter<'welcome' | 'join' | 'create'>();
}
