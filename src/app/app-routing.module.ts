import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const defaultRedirect = '/home/start';

const routes: Routes = [
  { path: '', redirectTo: defaultRedirect, pathMatch: 'full' },
  { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' } ,
  { path: 'home', loadChildren: './modules/home/home.module#HomeModule' } ,
  { path: '', redirectTo: defaultRedirect, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
