import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MenuComponent } from './menu.component';
import { Routes, RouterModule } from '@angular/router';
import { MenuJoinComponent } from './menu-join/menu-join.component';
import { MenuWelcomeComponent } from './menu-welcome/menu-welcome.component';

const routes: Routes = [
	{
		path: '',
		component: MenuComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MenuComponent, MenuJoinComponent, MenuWelcomeComponent]
})
export class MenuModule {}
