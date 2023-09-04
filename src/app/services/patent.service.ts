import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { Environment, SearchResponse } from 'toco-lib';
import { OpenPatent } from '../interfaces/open-patent.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatentService {

  patents: OpenPatent[] = [];

  @Output() patentToReview: EventEmitter<any> = new EventEmitter();


  constructor(    private _env: Environment,
                  private handler: HttpBackend,
                  private oAuthStorage: OAuthStorage,
                  private _http: HttpClient) { }

  getPatents(params: HttpParams): Observable<OpenPatent[]>{
    return this._http.get<OpenPatent[]>('', {params});
  }

  getPatentById(id: string): Observable<OpenPatent>{
    return this._http.get<OpenPatent>(`/${id}`);
  }

  getPatentsToReview(): Observable<OpenPatent[]>{
    return this._http.get<OpenPatent[]>('');
  }

  deletePatent(id: string){
    return this._http.delete<any>(`/${id}`);
  }

  GenerateInvoicePDF(invoiceno:any){
    return this._http.get('https://localhost:7118/Invoice/generatepdf?InvoiceNo='+invoiceno,{observe:'response',responseType:'blob'});
  }

  savePatents(){
  }
}
