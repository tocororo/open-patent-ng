import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 404){
            Swal.fire({
              html: `<h2>PID not found</h2>`,
              width: 400,
              showConfirmButton: false,
              timer: 1500,
              allowEscapeKey: true,
              icon: "success"
            });
          }
          return throwError(error);
        })
      )
  }
}

