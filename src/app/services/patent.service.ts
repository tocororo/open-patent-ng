import { HttpBackend, HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { OAuthStorage } from "angular-oauth2-oidc";
import { Observable } from "rxjs";
import { Environment, Hit, SearchResponse } from "toco-lib";
import { Patent } from "../interfaces/patent.entity";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class PatentService {
  url = "";
  private _http: HttpClient;

  constructor(
    private environment: Environment,
    private _httpAuth: HttpClient,
    private handler: HttpBackend
  ) {
    this.url = this.environment.sceibaApi;
    this._http = new HttpClient(handler);
  }

  getPatents(params: HttpParams): Observable<SearchResponse<Patent>> {
    return this._http.get<SearchResponse<Patent>>(
      `${this.url}/search/patents`,
      { params }
    );
  }

  getPatentById(id: string): Observable<Hit<Patent>> {
    return this._http.get<Hit<Patent>>(`${this.url}/pid/patent/${id}`);
  }

  createPatents(formData) {
    console.log("enviar", formData);
    return this._httpAuth.post(`${this.url}/patents/new`, formData);
  }

  editPatents(formData, id: string) {
    console.log('id', id);
    console.log('editar',formData);
    return this._httpAuth.post(`${this.url}/patents/${id}/edit`, formData);
  }

  deletePatent(id: string) {
    return this._httpAuth.delete<any>(`${this.url}/patents/delete/${id}`);
  }

  importPatents(patents) {
    // const formData = new FormData();
    // formData.set('file', file);
    // console.log(formData);

    // console.log(formData.get('file'));
    console.log('patents',patents);
    return this._httpAuth.post<any>(`${this.url}patents/import`, patents);
  }

  createRegister(register){
    return this._httpAuth.post<any>(`${this.url}patents/register/new`, register);
  }

  getRegister() {
    return this._http.get<any>(`${this.url}patents/register`);
  }

  deleteRegister(id){
    return this._httpAuth.delete<any>(`${this.url}patents/register/delete/${id}`);
  }
}
