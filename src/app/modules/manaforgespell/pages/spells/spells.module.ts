import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SpellsComponent } from './spells.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SpellsComponent
	},
	{
		path: ':world/:school',
		component: SpellsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SpellsComponent],
	providers: []
})
export class SpellsModule {}
