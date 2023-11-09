
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

const routes: Routes = [
	// {
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        // data: { layout: Layouts.Main },
      },
      {
        path: 'search',
        component: SearchComponent,
        // data: { layout: Layouts.Main },
      },
      {
        path: 'import',
        component: ImportPatentsComponent,
        canActivate: [CuratorPermissionService]

      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [CuratorPermissionService]
      },
      {
        path: 'create',
        component: SolicitarPatenteComponent,
        canActivate: [CuratorPermissionService]
      },
      {
        path: 'editar/:id',
        component: SolicitarPatenteComponent,
        canActivate: [CuratorPermissionService]
      },
      {
        path: 'detail',
        component: OpenPatentDetailComponent
      },
      {
        path: 'patent/:id',
        component: OpenPatentDetailComponent
      },
      // {
      //   path: 'help/contact',
      //   component: ContactComponent
      // },
    ],
  },
  {
    path: 'profile',
    component: ProfileLayoutComponent,
    // resolve: {
    //   'person': PeopleActiveResolverService
    // },
    children: [
      {
        path: ':id',
        component: ProfileComponent,
        // data: { layout: Layouts.People },

      }]
  },

];

@NgModule({
	imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule
{ }
