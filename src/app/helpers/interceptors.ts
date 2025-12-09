import { HttpHandler, HttpRequest, HttpHandlerFn, HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Snackbar } from '../components/general/snackbar/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from "@angular/core";
import { StatusResponse } from '../dtos/interceptor-dtos';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const _snackbar = inject(MatSnackBar);
  return next(req).pipe(tap(event => {
    if (event.type == HttpEventType.Response) {
      console.log(event);
      const message = (event.body as StatusResponse)?.message;
      if (!message) {
        console.log('no message in response');
      } else {
        _snackbar.openFromComponent(Snackbar, {
          duration: 3000,
          data: message
        });
      }
    }
  }));
}
