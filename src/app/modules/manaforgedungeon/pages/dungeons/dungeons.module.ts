import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DungeonsComponent } from './dungeons.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DungeonsComponent
	},
	{
		path: ':world',
		component: DungeonsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [DungeonsComponent],
	providers: []
})
export class DungeonsModule {}
