
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Environment, AuthBackend } from 'toco-lib';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public backend: AuthBackend = AuthBackend.sceiba

  constructor(
    private _env: Environment,
    private _http: HttpClient)
  { }

  public send(body): Observable<any>{
    let url = "";

    if (this.backend == AuthBackend.sceiba){
      url = this._env.sceibaApi + "contact";
    }
    else if (this.backend == AuthBackend.cuor) {
      url = this._env.cuorApi + "contact";
    }

    return this._http.post<any>(url, body)
  }
}
