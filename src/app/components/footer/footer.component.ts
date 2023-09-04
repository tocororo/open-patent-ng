import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Environment } from 'toco-lib';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input()
    public sites: Array< { name: string, url: string, useRouterLink: boolean } >;

    @Input()
    public information: Array< { name: string, url: string, useRouterLink: boolean } >;

    // @Input()
    // public image: string

    // @Input()
    // public extraImagePath = '';

    public menuApps: MenuElement[]

    public constructor(private _env: Environment, public iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
      this.iconRegistry.addSvgIcon('facebook',this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/svg/facebook.svg'));
      this.iconRegistry.addSvgIcon('twitter',this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/svg/twitter.svg'));
      this.iconRegistry.addSvgIcon('github', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/images/svg/github.svg'));
    }

    public ngOnInit(): void {
        if ( this.sites == undefined ) this.sites = new Array();
        if ( this.information == undefined ) this.information = new Array();

        this.menuApps = [
          {
            name: "SCEIBA",
            // @ts-ignore
            url : this._env.sceiba,
            useRouterLink : false,
          },
          {
            name : "BUSQUEDA",
            // @ts-ignore
            url : this._env.discover,
            useRouterLink : false,
          },
          {
            name : "REVISTAS_MES",
            // @ts-ignore
            url : this._env.revistasmes,
            useRouterLink : false,
          },
          {
            name : "CATALOGO",
            // @ts-ignore
            url : this._env.catalog,
            useRouterLink : false,
          },
          {
            name : "ORGANIZACIONES",
            // @ts-ignore
            url : this._env.organizations,
            useRouterLink : false,
          },
          {
            name : "PERSONAS",
            url : '/',
            useRouterLink : true,
          },
          {
            name : "VOCABULARIOS",
            // @ts-ignore
            url : this._env.vocabularies,
            useRouterLink : true,
          },
          {
            name : "SMOODLE",
            // @ts-ignore
            url : this._env.moodle,
            useRouterLink : false,
          },
          {
            name : "EVALUACION_APP",
            // @ts-ignore
            url : this._env.sceiba,
            useRouterLink : false,
          },
        ];
    }
}

export interface MenuElement {
  name: string;
  url?: string;
  useRouterLink?: boolean;
}
