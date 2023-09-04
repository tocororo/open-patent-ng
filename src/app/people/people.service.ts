import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { OAuthStorage } from "angular-oauth2-oidc";

import {
  cloneValue,
  Environment,
  Hit,
  Organization,
  SearchResponse,
} from "toco-lib";

import { Person } from "./person.entity";

/**
 * Represents the service that communicates with the backend for all issues
 * that refer to work with people.
 */
@Injectable({
  providedIn: "root",
})
export class PeopleService {
  private readonly _prefix = "people";

  // _http: HttpClient;

  public constructor(
    private _env: Environment,
    private handler: HttpBackend,
    private oAuthStorage: OAuthStorage,
    private _http: HttpClient
  ) {
    {
      // this._http = new HttpClient(this.handler);
    }
  }

  /**
   * Constructs a `GET` request that interprets the body as a JSON object and returns
   * the response body in the `SearchResponse<Person>` type.
   * Returns a people group that follows a search criteria.
   * E.g.: lang=es&size=15&page=0&q=pinar%20del%20rio&country=Cuba&status=active
   * @param currentLang Language currently used as string.
   * The Spanish language is: 'es'.
   * The English language is: 'en'.
   * @return An `Observable` of the `HTTPResponse`, with a response body in the `SearchResponse<Person>` type.
   */
  public getPeople(params: HttpParams): Observable<SearchResponse<Person>> {
    const options = {
      params: params,
      // headers: this.headers
    };
    // console.log(params);
    const req = this._env.sceibaApi + "search/persons/";
    // console.log(req);
    return this._http.get<SearchResponse<Person>>(req);
  }

  public getPeopleById(uuid: string): Observable<any> {
    const req = this._env.sceibaApi + "pid/persons/" + uuid;
    return this._http.get<SearchResponse<Person>>(req);
  }

  saveImport(org, file: File) {
    let token = this.oAuthStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const req = this._env.sceibaApi + "persons/import/" + org;
    // const headers = new HttpHeaders({
    //   enctype: "multipart/form-data",
    //   "Content-Type": "multipart/form-data",
    //   "Accept": "*/*",
    //   // Authorization: "Bearer " + token,
    //   "Access-Control-Allow-Origin": "*",
    // });
    return this._http.post(req, formData);
  }
}
