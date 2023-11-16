import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MarkdownModule } from "ngx-markdown";

import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";


import { OAuthModule, OAuthStorage } from "angular-oauth2-oidc";
import {
  AngularMaterialModule,
  AuthenticationModule,
  CoreModule,
  Environment, OrganizationServiceNoAuth, SearchModule,
  SearchService,
  SourceServiceNoAuth,
  StaticsModule,
  TocoFormsModule, OrganizationsModule
} from "toco-lib";

import { allowedURLS, environment } from "src/environments/environment";

import { NgxDropzoneModule } from "node_modules/ngx-dropzone";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MenuItemComponent } from "./components/header/menu-item/menu-item.component";
import { MenuComponent } from "./components/header/menu/menu.component";
import { HomeComponent } from "./pages/home/home.component";
import { ImportPeopleComponent } from "./import-people/import-people.component";
import { OrgDialogComponent } from "./import-people/org-dialog/org-dialog.component";
import { MainlayoutComponent } from "./layout/mainlayout/mainlayout.component";
import { OrgService } from "./org.service";
import { SearchListComponent } from "./components/search-list/search-list.component";
import { SearchComponent } from "./components/search/search.component";
import { SelectOrgComponent } from "./select-org/select-org.component";
import { SolicitarPatenteComponent } from "./pages/solicitar-patente/solicitar-patente.component";
import { JsonTableComponent } from './import-people/json-table/json-table.component';
import { CsvTableComponent } from './import-people/csv-table/csv-table.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OpenPatentDetailComponent } from './pages/open-patent-detail/open-patent-detail.component';
import { ProfileLayoutComponent } from './layout/profile-layout/profile-layout.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PdfViewerModalComponent } from './pages/open-patent-detail/pdf-viewer-modal/pdf-viewer-modal.component';
import { ImportPatentsComponent } from './pages/import-patents/import-patents.component';
import { TableComponent } from './pages/import-patents/table/table.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ExportPdfExcelComponent } from './components/export-pdf-excel/export-pdf-excel.component';
import { HelpCComponent } from './pages/help-c/help-c.component';
export function storageFactory(): OAuthStorage {
  return localStorage;
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    exports: [MainlayoutComponent, ProfileLayoutComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        SearchComponent,
        SearchListComponent,
        MainlayoutComponent,
        HeaderComponent,
        MenuComponent,
        MenuItemComponent,
        ImportPeopleComponent,
        SelectOrgComponent,
        SolicitarPatenteComponent,
        OrgDialogComponent,
        ContactComponent,
        JsonTableComponent,
        CsvTableComponent,
        ProfileComponent,
        OpenPatentDetailComponent,
        ProfileLayoutComponent,
        ConfirmComponent,
        PdfViewerModalComponent,
        ImportPatentsComponent,
        TableComponent,
        RegisterComponent,
        PageNotFoundComponent,
        AddModalComponent,
        ExportPdfExcelComponent,
        HelpCComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        PdfViewerModule,
        MatTableModule,
        MatPaginatorModule,
        NgxDropzoneModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        ReactiveFormsModule,
        FlexLayoutModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
        }),
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatTabsModule,
        MatChipsModule,
        MatExpansionModule,
        MatListModule,
        TocoFormsModule,
        MatRadioModule,
        MatCheckboxModule,
        FormsModule,
        AngularMaterialModule,
        CoreModule,
        StaticsModule,
        TocoFormsModule,
        SearchModule,
        AuthenticationModule,
        OrganizationsModule,
        AppRoutingModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: allowedURLS,
                sendAccessToken: true,
            },
        }),
    ],
    providers: [
        SearchService,
        SourceServiceNoAuth,
        OrganizationServiceNoAuth,
        OrgService,
        { provide: Environment, useValue: environment },
        { provide: OAuthStorage, useFactory: storageFactory },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
