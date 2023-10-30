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

  url = 'https://localhost:5000/api';


  constructor(    private environment: Environment,
                  private handler: HttpBackend,
                  private oAuthStorage: OAuthStorage,
                  private _http: HttpClient) { }

  getPatents(params: HttpParams): Observable<SearchResponse<Patent>>{
    const req = this.environment.sceibaApi + 'search/patents/';
    return this._http.get<SearchResponse<Patent>>(`${this.url}/search/patents`, {params});
  }

  getPatentById(id: string): Observable<Patent>{
    return this._http.get<Patent>(`/${id}`);
  }

  createPatents(formData){
    return this._http.post('', formData)
  }

  editPatents(formData, id: string){
    return this._http.post('', formData)
  }

  deletePatent(id: string){
    return this._http.delete<any>(`/${id}`);
  }

  importPatents(formData: FormData){
    // const url = this._env.cuorHost + "import";
    return this._http.post<any>('', formData);
  }

  getRegister(){
    return this._http.get('');
  }
}
