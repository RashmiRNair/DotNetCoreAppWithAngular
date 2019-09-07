import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { _throw as throwError } from "rxjs/observable/throw";
import { Observable } from "rxjs/Observable";


@Injectable()
export class ErrorInterceptors implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError(error => {
          if (error.status == 401) {
            return throwError(error.statusText);
          }

          if (error instanceof HttpErrorResponse) {
            const applicationError = error.headers.get("Application-Error");
            if (applicationError) {
              return throwError(applicationError);
            }
            const serverError = error.error;
            let modalStateError = "";

            if (serverError && typeof serverError === "object") {
              for (const key in serverError) {
                if (serverError[key]) {
                  modalStateError += serverError[key] + "\n";
                }
              }
            }

           return throwError(modalStateError || serverError || "Server Error");
          }
        })  
      );
    }

}
