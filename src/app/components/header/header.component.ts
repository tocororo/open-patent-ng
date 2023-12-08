import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Observable, Subscription } from 'rxjs';
import {
  convertLangFromNumberToString,
  Environment, OauthAuthenticationService, OauthInfo, Response, User
} from 'toco-lib';
import { menuHelp } from "./constants";
import { Patent } from '../../interfaces/patent.entity';
import { PatentService } from '../../services/patent.service';

@Component({
  selector: 'toco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuElements: MenuElement[];
  /**
    * Returns the available language texts.
    */
   @Input() public languageTexts: string[] = ['Español', 'English'];;
  /**
   * Returns the available language abbreviations.
   */
   @Input() public languageAbbrs: string[] = ['es', 'en'];;
  /**
   * Returns the language currently used as number.
   * The Spanish language is: 0. It is the default.
   * The English language is: 1.
   */
  public currentLang: number;
  @Input() public isBeta: boolean = true;
  /**
   * Gets the icon for menu bar
   */
  //  @Input() public isBeta: boolean = true;
  /**
   * Gets the icon for menu bar
   */
   @Input() public icon: '';
  /**
   * Gets the icon label for menu bar
   */
  @Input() public iconLabel: '';
  /**
   * Gets the icon alt for menu bar
   */
  @Input() public iconAlt: '';
  /**
   * Gets a list of input `menuOptions` to build the menu bar
   */
   @Input() public menuOptions: MenuElement[];
  /**
   * Gets a list of input `menuLoginOptions` to build the login menu
   */
  @Input() public menuLoginOptions: MenuElement[];
  /**
   * Gets a list of input `menuUser` to build the user menu
   */
  @Input() public menuUser: MenuElement[];
  /**
   * Gets a boolean value of input `showMenuLang` to show a menuAppsnu
   */
  @Input() public showMenuLang: boolean;
  /**
   * Gets a value of input `isAuthenticated` to know when user is authenticated
   */
  @Input() public isAuthenticated: boolean = false;
  /**
   * Gets a value of input `autehnticated_name` to know the name of the authenticated user
   */
  @Input() public autehnticated_name: string = '';

  public _menuLoginOptions: MenuElement[]
  public _menuUser: MenuElement[]
  public _menuOptions: MenuElement[]
  public _menuApps: MenuElement[]
  public staticMenuOptions: MenuElement[]

  patents: Patent[] = [];

  public sceibaHost: string;

  public simpleMenu = false;

  public user: User = null;

  public oauthInfo: OauthInfo;

  private authenticateSuscription: Subscription = null;

  public constructor(
    private _env: Environment,
    private _transServ: TranslateService,
    private patentService: PatentService,
    private router: Router,
    private oauthService: OAuthService,
    protected http: HttpClient,
    private oauthStorage: OAuthStorage,
    private authenticateService: OauthAuthenticationService
  ) {
    let env: any = this._env;
    this.oauthInfo = env.oauthInfo;
  }

  ngOnInit() {
    this.currentLang = 0;  /* The default language is Spanish; that is, the zero index. */
    this.showMenuLang == undefined ? this.showMenuLang = false : null;

    this.sceibaHost = this._env.sceibaHost;

    this._transServ.setDefaultLang('es');
    this._transServ.use('es');
    this._transServ.addLangs(this.languageAbbrs);

    this._menuLoginOptions = this.menuLoginOptions || [
      {
        nameTranslate : "AUTENTICARSE",
        icon: "lock",
        href: null,
        // click: () => this.login
        click: () => console.log("login===")
      },
      {
        nameTranslate : "REGISTRARSE",
        icon: "assignment_ind",
        href: null,
        // click: () => this.login
        click: () => console.log("login===")
      }
    ];

    this._menuUser = this.menuUser || [
      {
        nameTranslate : "ACCOUNT_SETTINGS",
        icon: "account_circle",
        href: `${ this.sceibaHost }account/settings/profile/`,
        useRouterLink : false,
        target: "_blank",
        click: () => console.log("login===")
      },
      {
        nameTranslate : "PERFIL_USUARIO",
        icon: "person_outline",
        href: `/person/${this.user && this.user.id}`,
        useRouterLink: true,
        click: () => console.log("login===")

      },
      {
        nameTranslate : "CAMBIAR_CONTRASEÑA",
        icon: "vpn_key",
        href: `https://cuba-iroko.sceiba.org/account/settings/password/`,
        useRouterLink : false,
        target: "_blank",
        click: () => console.log("login===")

      },
      {
        nameTranslate : "SEGURIDAD",
        icon: "security",
        href: `${ this.sceibaHost }account/settings/security/`,
        useRouterLink : false,
        target: "_blank",
        click: () => console.log("login===")

      },
      {
        nameTranslate : "APLICACIONES",
        icon: "settings_applications",
        href: `${ this.sceibaHost }account/settings/applications/`,
        useRouterLink : false,
        target: "_blank",
        click: () => console.log("login===")

      },
      {
        nameTranslate : "SALIR",
        icon: "exit_to_app",
        href: '/',
        useRouterLink: true,
        click: () => this.logoff()
      },
    ];

    const menuApps = this._menuApps || [
      {
        nameTranslate: "SCEIBA",
        // @ts-ignore
        href : this._env.sceiba,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/sceiba.svg", style: ""},
        divider: true
      },
      {
        nameTranslate : "BUSQUEDA",
        // @ts-ignore
        href : this._env.discover,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/discover.svg", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "REVISTAS_MES",
        // @ts-ignore
        href : this._env.revistasmes,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/revistasmes.png", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "CATALOGO",
        // @ts-ignore
        href : this._env.catalog,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/catalog.svg", style: "width: 55px; height: 55px"},
        divider: true
      },
      {
        nameTranslate : "ORGANIZACIONES",
        // @ts-ignore
        href : this._env.organizations,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/organizaciones.svg", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "PERSONAS",
        // @ts-ignore
        href : '/',
        target: "_self",
        useRouterLink : true,
        img: {src: "/assets/icons/apps/persons.svg", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "VOCABULARIOS",
        // @ts-ignore
        href : this._env.vocabularies,
        target: "_blank",
        useRouterLink : true,
        img: {src: "/assets/icons/apps/vocabs.svg", style: "width: 55px; height: 55px"},
        divider: true
      },
      {
        nameTranslate : "SMOODLE",
        // @ts-ignore
        href : this._env.moodle,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/scourses.svg", style: "width: 55px; height: 55px"}
      },
      {
        nameTranslate : "EVALUACION_APP",
        // @ts-ignore
        href : this._env.sceiba,
        target: "_blank",
        useRouterLink : false,
        img: {src: "/assets/icons/apps/evaluations.svg", style: "width: 55px; height: 55px"}
      },
    ];

    this.staticMenuOptions = this.menuOptions || [
      {
        nameTranslate: "APLICACIONES",
        icon: "apps",
        childrenMenu: menuApps,
        isMenuApps: true,
        click: () => console.log("login===")

      },
      {
        nameTranslate: "AYUDA",
        icon: "help",
        childrenMenu: menuHelp,
        click: () => console.log("login===")

      },
      // {
      //   nameTranslate: "USUARIO",
      //   icon: "account_circle",
      //   childrenMenu: this.menuLoginOptions,
      //   hidden: this.isAuthenticated
      // },
      // {
      //   nameTranslate: "AUTENTICARSE",
      //   icon: "account_circle",
      //   childrenMenu: this.menuLoginOptions,
      //   hidden: this.isAuthenticated
      // },
    ];

    this._menuOptions = this.staticMenuOptions



    let request = JSON.parse(this.oauthStorage.getItem("user"));
    console.log(request);
    if (request) {
      if (request.roles) {
        this.user = request;
        const roles = request.roles.map((rol)=> rol.name);
        localStorage.setItem("roles", roles);
      }
      else{
        this.user = request.data.userprofile.user;
      }

      this._menuOptions = [
        ...this.staticMenuOptions,
        {
          nameTranslate: "CREATE",
          icon: "add_circle",
          useRouterLink: true,
          hideLabel: true,
          href: '/create',
        },
        {
          nameTranslate: this.user ? this.user.email.split('@')[0] : '',
          icon: 'person_pin',
          childrenMenu: this._menuUser,
          hideLabel: true
        }
      ]
    }

    this.authenticateSuscription =
      this.authenticateService.authenticationSubjectObservable.subscribe(
        (request) => {
          if (request) {
            if (request.roles) {
              this.user = request;
              const roles = request.roles.map((rol)=> rol.name);
              localStorage.setItem("roles", roles);
            }
            else{
              this.user = request.data.userprofile.user;
            }

          this._menuOptions = [
            ...this.staticMenuOptions,
            {
              nameTranslate: "CREATE",
              icon: "add_circle",
              useRouterLink: true,
              hideLabel: true,
              href: '/create',
            },
            {
              nameTranslate: this.user ? this.user.email.split('@')[0] : '',
              icon: 'person_pin',
              childrenMenu: this._menuUser,
              hideLabel: true
            }
           ]
          } else {
            this.logoff();
          }
        },
        (error: any) => {
          this.user = null;
        },
        () => {}
      );
  }

  ngOnDestroy(): void {
    if (this.authenticateSuscription) {
      this.authenticateSuscription.unsubscribe();
    }
  }

  /*******************************************************************
   * Check if display is less than 600px to update menu classes
   * @returns String
   */
  showHideMenuHeader(): string {
    let menuClass = 'menuAppst-menu-trigger menuAppst-icon-button menuAppst-button-base';
    return window.innerWidth < 600 ? menuClass + ' show-menu' : menuClass + ' hide-menu';
  }
  showHideMenuHeaderElements(): string {
    return (window.innerWidth > 600) ? 'menu-full show-menu-elements' : 'menu-full hide-menu';
  }

  /**
     * Sets the current language.
     * @param index Zero-based index that indicates the current language.
     */
  public setLanguage(index: number): void {
    if (index != this.currentLang) {
      console.log('setLanguage method is called with language: ', index);

      let currentLangAsString: string = convertLangFromNumberToString((this.currentLang = index));

      /* Informs the new current language. */
      this._transServ.use(currentLangAsString);
      // this._recaptchaDynamicLanguageLoaderServ.updateLanguage(currentLangAsString);
    }
  }



  public get isHome() {
    return this.router.url == '/';
  }

  public login() {
    console.log('hi');

    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
    this.oauthStorage.removeItem("user");
    this.user = undefined;
    this._menuOptions = this.staticMenuOptions;
  }

  public get name()
  {
    let user = JSON.parse(this.oauthStorage.getItem("user"));
    if (!user) return null;
    return user['email'];
  }

  getUserInfo(): Observable<Response<any>> {
    let token = this.oauthStorage.getItem('access_token');
    let headers = new HttpHeaders()
    headers.set('Authorization', 'Bearer ' + token);
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    const options = {
      headers: headers
    };
    return this.http.get<Response<any>>(this._env.sceibaApi + 'me');
  }

  public me()
  {
    this.getUserInfo().subscribe({
      next: (response) => {
        console.log(response)
      },

      error: (e) => { },

      complete: () => { },
    });
  }

}


interface IMG {
  src: string;
  style: string;
}

export interface MenuElement {
  nameTranslate: string;
  href?: string;
  target?: string;
  useRouterLink?: boolean;
  icon?: string;
  click?: any;
  img?: IMG;
  divider?: boolean;
  hidden?: boolean;
  isMenuApps?: boolean;
  childrenMenu?: MenuElement[];
  hideLabel?: boolean;
}
