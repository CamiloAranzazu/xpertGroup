import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './pages/files/files.component';
import { AdminComponent } from './admin.component';

const defaultRedirect = '/admin/files';

const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        { path: '', redirectTo: defaultRedirect, pathMatch: 'full' },
        { path: 'files', component: FilesComponent },
        { path: '**', redirectTo: defaultRedirect, pathMatch: 'full' }
      ]
    },
    { path: '**', redirectTo: defaultRedirect }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }

