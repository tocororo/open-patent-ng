import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OAuthStorage } from 'angular-oauth2-oidc';
// import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { MessageHandler, StatusCode } from 'toco-lib';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CuratorPermissionService implements CanActivate{

  constructor(
    // private oauthStorage: OAuthStorage,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private oauthStorage: OAuthStorage,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let permission = new Permission();
    let request = JSON.parse(this.oauthStorage.getItem("user"));


    // if (permission.hasPermissions("curator") || permission.hasPermissions("admin")){
    //   return true;
    // }
    if(request){
      return true;
    }
    this._router.navigate(['/']);
    Swal.fire({
      html: `<h2>Usted no tiene permiso para acceder a esta ruta</h2>`,
      width: 400,
      showConfirmButton: false,
      timer: 1500,
      allowEscapeKey: true,
      icon: "error"
    });
    // const m = new MessageHandler(this._snackBar);
    // m.showMessage(StatusCode.OK, "Usted no tiene los permisos para acceder a esta ruta");
    return false;
  }

}

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionService implements CanActivate{

  constructor(
    private _router: Router,
    private oauthStorage: OAuthStorage,) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let permission = new Permission();
    let request = JSON.parse(this.oauthStorage.getItem("user"));

    if(request && permission.hasPermissions("admin")){
      return true;
    }

    this._router.navigate(['/']);
    Swal.fire({
      html: `<h2>Usted no tiene permiso para acceder a esta ruta</h2>`,
      width: 400,
      showConfirmButton: false,
      timer: 1500,
      allowEscapeKey: true,
      icon: "error"
    });
    return false;
  }
}

export class Permission {

  constructor() {}

  public hasPermissions(roleName: string): boolean {
    if (localStorage.getItem('roles') && localStorage.getItem('roles').length > 0){

      const roles = localStorage.getItem('roles').split(",")

      for (const rol in roles) {
        if (roles[rol] == roleName){
          return true;
        }
      }
    }
    return false;
  }
}
