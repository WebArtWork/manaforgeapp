import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SettingsComponent } from './settings.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SettingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SettingsComponent]
})
export class SettingsModule {}
