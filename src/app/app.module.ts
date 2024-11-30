import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GameplayComponent } from './core/theme/gameplay/gameplay.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: GameplayComponent,
		children: [
			/* gameplay */
			{
				path: 'create',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Create'
					}
				},
				loadChildren: () => import('./pages/gameplay/create/create.module').then(m => m.CreateModule)
			}, 
			{
				path: 'story',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Story'
					}
				},
				loadChildren: () => import('./pages/gameplay/story/story.module').then(m => m.StoryModule)
			}, 
			{
				path: 'settings',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Settings'
					}
				},
				loadChildren: () => import('./pages/gameplay/settings/settings.module').then(m => m.SettingsModule)
			},
			{
				path: 'game',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Game'
					}
				},
				loadChildren: () => import('./pages/gameplay/game/game.module').then(m => m.GameModule)
			},
			{
				path: 'menu',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Menu'
					}
				},
				loadChildren: () => import('./pages/gameplay/menu/menu.module').then(m => m.MenuModule)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'stories',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Stories'
					}
				},
				loadChildren: () => import('./modules/manaforgestory/pages/stories/stories.module').then(m => m.StoriesModule)
			}, 
			{
				path: 'gameplays',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Gameplays'
					}
				},
				loadChildren: () => import('./modules/manaforge/pages/gameplays/gameplays.module').then(m => m.GameplaysModule)
			},
			{
				path: 'heroes',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Heroes'
					}
				},
				loadChildren: () => import('./modules/manaforgehero/pages/heroes/heroes.module').then(m => m.HeroesModule)
			},
			{
				path: 'spells',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Spells'
					}
				},
				loadChildren: () => import('./modules/manaforgespell/pages/spells/spells.module').then(m => m.SpellsModule)
			},
			{
				path: 'schools',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Schools'
					}
				},
				loadChildren: () => import('./modules/manaforgeschool/pages/schools/schools.module').then(m => m.SchoolsModule)
			},
			{
				path: 'dungeons',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Dungeons'
					}
				},
				loadChildren: () => import('./modules/manaforgedungeon/pages/dungeons/dungeons.module').then(m => m.DungeonsModule)
			},
			{
				path: 'artifacts',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Artifacts'
					}
				},
				loadChildren: () => import('./modules/manaforgeartifact/pages/artifacts/artifacts.module').then(m => m.ArtifactsModule)
			},
			{
				path: 'worlds',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Worlds'
					}
				},
				loadChildren: () => import('./modules/manaforgeworld/pages/worlds/worlds.module').then(m => m.WorldsModule)
			},
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent, GameplayComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: 'Web Art Work',
					titleSuffix: ' | Web Art Work',
					'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		/* providers */
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
