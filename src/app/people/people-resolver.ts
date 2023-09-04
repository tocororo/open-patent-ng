import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { SearchResponse } from 'toco-lib';
import { Permission } from './permission.service';
import { PeopleService } from './people.service';
import { Person } from './person.entity';


export interface IError {
  title: string;
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShowErrorService {

    /**
     * A Subject that behaves as the bridge between the two components. 
     * It emits an IError if there is an HTTP request error. 
     */

  public errorSubject = new Subject<IError>();

  constructor() { }

  sendErrors(err: IError) {
    this.errorSubject.next(err);
  }

  clearErrors() {
      this.errorSubject.next();
  }

  getErrors(): Observable<IError> {
      return this.errorSubject.asObservable();
  }

}

@Injectable({
	providedIn: 'root',
})
export class PeopleActiveResolverService implements Resolve<SearchResponse<Person>>
{
	public constructor(
    private router: Router,
    private service: PeopleService,
    private errorService: ShowErrorService
  )	{ }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
	{
		let uuid = route.paramMap.get('uuid');
    let serviceAnswer : Observable<SearchResponse<Person>>;
		// if (this.hasCurationPermission){
      serviceAnswer = this.service.getPeopleById(uuid);
    // }
    // else {
      // serviceAnswer = this.service.getActivePeopleById(uuid);
    // }

    return serviceAnswer.pipe(
      take(1),
      map(hit => {
          if (hit) {
            // console.log(hit)
            if (hit["ERROR"]){
              console.log("Error desde el backend, ", hit["ERROR"]);
              this.errorService.sendErrors({
				  "title": "Error desde el servidor", 
				  "status":"402",
				  "message": hit["ERROR"]
				});
              this.router.navigate(['error']);
            }
            else{
              return hit;
            }
          }
          else {
                //this.router.navigate(['/']);
                console.log("Esto es cuando no hay hit");

              }
        })
      );
		// return of(orgExample);
	}

  /**
	 * hasPermission return true if the user have permission
	 */
	public get hasCurationPermission(): boolean {
		let permission = new Permission();

		if (permission.hasPermissions("curator") || permission.hasPermissions("admin")) {
			return true;
		}
		return false;
	}

}