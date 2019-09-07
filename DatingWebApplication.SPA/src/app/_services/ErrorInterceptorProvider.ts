import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptors } from "./error.interceptor";


export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptors,
  multi: true
}
