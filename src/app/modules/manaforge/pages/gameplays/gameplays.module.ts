import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { GameplaysComponent } from './gameplays.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: GameplaysComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [GameplaysComponent],
	providers: []
})
export class GameplaysModule {}
