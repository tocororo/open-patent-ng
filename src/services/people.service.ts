import {Injectable} from "@angular/core";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {Environment} from "toco-lib";
import {Observable} from "rxjs";
import {Person} from "../app/people/person.entity";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private newHttp: HttpClient;
  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private environment: Environment
  ) {
    this.newHttp = new HttpClient(handler);
  }

  getOrganizationById(id: string): Observable<Person> {
    const req = this.environment.cuorApi + 'view/' + id ;
    // console.log(req);

    return this.newHttp.get<Person>(req);
  }
}
