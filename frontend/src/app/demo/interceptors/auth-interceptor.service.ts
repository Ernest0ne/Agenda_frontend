import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as SecureLS from 'secure-ls';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { SokectIoService } from '../Services/sokect-io.service';
import { UserService } from '../Services/user.service';
import { FuncionesGenerales } from '../Components/FuncionesGenerales/funcionesGenerales';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private ls = new SecureLS({ encodingType: 'aes' });

  constructor(private sokectIoService: SokectIoService, public userService: UserService, public funcionesGenerales: FuncionesGenerales) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    if (this.ls.get('token')) {
      if (request.url != 'https://jsonip.com') {
        request = req.clone({
          setHeaders: {
            authenticator: this.ls.get('token'),
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
        } else {
          return throwError(error);
        }
      }),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: event.body });
          if (!event.body.status) {
            this.funcionesGenerales.showErrorViaToast(event.body.message)
            return null;
          }
        }
        return event;
      })
    );
  }

}
