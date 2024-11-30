import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { StoriesComponent } from './stories.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: StoriesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [StoriesComponent],
	providers: []
})
export class StoriesModule {}
