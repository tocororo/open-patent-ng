import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { Environment, SearchResponse } from 'toco-lib';
import { Patent } from '../interfaces/patent.entity';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatentService {

  patents: Patent[] = [];


  constructor(    private _env: Environment,
                  private handler: HttpBackend,
                  private oAuthStorage: OAuthStorage,
                  private _http: HttpClient) { }

  getPatents(params: HttpParams): Observable<SearchResponse<Patent>>{
    return this._http.get<SearchResponse<Patent>>('', {params});
  }

  getPatentById(id: string): Observable<Patent>{
    return this._http.get<Patent>(`/${id}`);
  }

  createPatents(formData){
    return this._http.post('', formData)
  }

  deletePatent(id: string){
    return this._http.delete<any>(`/${id}`);
  }

  importPatents(formData: FormData){
    // const url = this._env.cuorHost + "import";
    return this._http.post<any>('', formData);
  }
}
