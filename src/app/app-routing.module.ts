
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './components/search/search.component';
import {Layouts} from "./app.component";
import { ImportPeopleComponent } from './import-people/import-people.component';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileLayoutComponent } from './layout/profile-layout/profile-layout.component';
import { SolicitarPatenteComponent } from './pages/solicitar-patente/solicitar-patente.component';
import { OpenPatentDetailComponent } from './pages/open-patent-detail/open-patent-detail.component';
import { ImportPatentsComponent } from './pages/import-patents/import-patents.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AdminPermissionService, CuratorPermissionService } from './permission.service';
import { UserService } from './org.service';
import { HelpCComponent } from './pages/help-c/help-c.component';

const routes: Routes = [
	// {
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'patent/:id',
        component: OpenPatentDetailComponent
      },
      {
        path: 'import',
        component: ImportPatentsComponent,
        canActivate: [AdminPermissionService]

      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AdminPermissionService]
      },
      {
        path: 'create',
        component: SolicitarPatenteComponent,
        canActivate: [AdminPermissionService]
      },
      {
        path: 'editar/:id',
        component: SolicitarPatenteComponent,
        canActivate: [AdminPermissionService]
      },

      {
        path: 'help/about',
        component: HelpCComponent
      },
      {
        path: 'help/contact',
        component: ContactComponent
      },
      {
        path: '**',
        redirectTo: ''
      },
    ],
  },

];

@NgModule({
	imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule
{ }
