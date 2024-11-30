import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ArtifactsComponent } from './artifacts.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ArtifactsComponent
	},
	{
		path: ':world/:dungeon',
		component: ArtifactsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ArtifactsComponent],
	providers: []
})
export class ArtifactsModule {}
