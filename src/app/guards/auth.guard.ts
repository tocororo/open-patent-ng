import { Injectable, NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { ActionText } from 'toco-lib';
import { SolicitarPatenteComponent } from '../pages/solicitar-patente/solicitar-patente.component';

const authRoutes: Routes = [
  {
    path: ActionText.edit,
    component: SolicitarPatenteComponent
  },
  {
    path: ActionText.add,
    component: SolicitarPatenteComponent
  },
]

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],

	exports: [RouterModule]
})

export class AuthRoutingModule
{ }

// const oauthService = inject(OAuthService);
// const  router = inject(Router);


// export class AuthGuard implements CanActivate {


//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }

// }
