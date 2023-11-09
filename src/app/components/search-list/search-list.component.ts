
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Permission } from 'src/app/permission.service';
// import { OAuthStorage } from 'angular-oauth2-oidc';
import { Hit, HitList, MessageHandler, Organization, StatusCode } from 'toco-lib';
import { Patent } from '../../interfaces/patent.entity';
import { Person } from '../../people/person.entity';
import { ConfirmComponent } from '../confirm/confirm.component';
import { PatentService } from '../../services/patent.service';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
	selector: 'search-list',
	templateUrl: './search-list.component.html',
	styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit
{

	@Input()
	// public hitList: HitList<Person>;
  public hitList: HitList<Patent>;
  public pdfType: 'list' | 'single' =  'list';
  isLogged: boolean = false

  m = new MessageHandler(this._snackBar);


    public constructor( private _snackBar: MatSnackBar,
                        public dialog: MatDialog,
                        private _router: Router,
                        private patentService: PatentService,
                        private oauthStorage: OAuthStorage,)
	{ }

	public ngOnInit(): void
	{
    let request = JSON.parse(this.oauthStorage.getItem("user"));

    if (request) {
      this.isLogged = true;
    }
	}
	/**
	* hasPermission return true if the user have permission
	*/
	public get hasPermission(): boolean {
		let permission = new Permission();

		if (permission.hasPermissions("curator")|| permission.hasPermissions("admin")) {
			return true;
		}
		return false;
	}

  eliminar(patent: Hit<Patent>){
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: { ...patent },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Eliminar');

        this.patentService.deletePatent(patent.metadata.id).subscribe((res) => {
          console.log(res);
          if (res) {
            try {
              this.hitList.hits = this.hitList.hits.filter(hit =>
                hit.metadata.id != patent.metadata.id
              );

            this.m.showMessage(StatusCode.OK, "Se ha eliminado correctamente");

            }
            catch {
              console.log('error');

            }
          }
        });
      }
    });

  }
}
