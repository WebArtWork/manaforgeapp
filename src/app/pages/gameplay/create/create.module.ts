import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CreateComponent } from './create.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':manaforge',
		component: CreateComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [CreateComponent]
})
export class CreateModule {}
