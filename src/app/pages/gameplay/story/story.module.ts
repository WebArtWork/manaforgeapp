import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { StoryComponent } from './story.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: StoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [StoryComponent]
})
export class StoryModule {}
