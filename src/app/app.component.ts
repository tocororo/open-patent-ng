
import { Component } from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { convertLangFromNumberToString, Environment } from 'toco-lib';

export enum Layouts {
  People,
  Main,
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent
{
	/**
	  * Returns the available language texts.
	  */
	public languageTexts: string[];
	/**
	 * Returns the available language abbreviations.
	 */
	public languageAbbrs: string[];
	/**
	 * Returns the language currently used as number.
	 * The Spanish language is: 0. It is the default.
	 * The English language is: 1.
	 */
	public currentLang: number;

	public footerSites: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public footerInformation: Array<{ name: string, url: string, useRouterLink: boolean }>;

	public sceibaHost: string;

  public Layouts = Layouts;
  public layout: Layouts;

	public constructor(private _env: Environment,
		// private _matomoInjector: MatomoInjector,
		private _router: Router,
		private _transServ: TranslateService,
		private _snackBar: MatSnackBar,
    //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
    /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/)
	{
		// this._matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);
	}

	public ngOnInit(): void
	{
		this.languageTexts = ['Español', 'English'];
		this.languageAbbrs = ['es', 'en'];
		this.currentLang = 0;  /* The default language is Spanish; that is, the zero index. */
		this._transServ.setDefaultLang('es');
		this._transServ.use('es');
		this._transServ.addLangs(this.languageAbbrs);
		//this._recaptchaDynamicLanguageLoaderServ.updateLanguage('es');

		this.sceibaHost = this._env.sceibaHost;

		this.footerSites = Array();
		this.footerInformation = Array();

		// this.footerSites.push({ name: "MES", url: "https://www.mes.gob.cu", useRouterLink: false});
		// this.footerSites.push({ name: "ONEI", url: "http://www.onei.gob.cu/", useRouterLink:false});
		// this.footerSites.push({ name: "GRID", url: "https://www.grid.ac", useRouterLink: false});
		// this.footerSites.push({ name: "ROR", url: "https://ror.org/", useRouterLink: false});
		// this.footerSites.push({ name: "Wikidata", url: "https://www.wikidata.org/wiki/Wikidata:Main_Page", useRouterLink: false});

		this.footerInformation.push({ name: "ACERCA_DE", url: "/help/about", useRouterLink: true });
		this.footerInformation.push({ name: "PRIVACIDAD", url: "/help/policy", useRouterLink: true });
		// this.footerInformation.push({ name: "PRIVACIDAD", url: "https://sceiba-lab.upr.edu.cu/page/politicas", useRouterLink: false});
		this.footerInformation.push({ name: "CONTACTOS", url: "/help/contact", useRouterLink: true });

    this._router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.layout = data.state.root.firstChild.data.layout;
      }
    });
	}

	/**
	 * Sets the current language.
	 * @param index Zero-based index that indicates the current language.
	 */
	public setLanguage(index: number): void
	{
		if (index != this.currentLang)
		{
			console.log('setLanguage method is called with language: ', index);

			let currentLangAsString: string = convertLangFromNumberToString((this.currentLang = index));

			/* Informs the new current language. */
			this._transServ.use(currentLangAsString);
			// this._recaptchaDynamicLanguageLoaderServ.updateLanguage(currentLangAsString);
		}
	}

	public get isHome()
	{
		return this._router.url == '/';
	}
}
