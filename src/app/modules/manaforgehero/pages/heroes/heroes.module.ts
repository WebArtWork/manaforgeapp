import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { HeroesComponent } from './heroes.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: HeroesComponent
	},
	{
		path: ':world',
		component: HeroesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [HeroesComponent],
	providers: []
})
export class HeroesModule {}
