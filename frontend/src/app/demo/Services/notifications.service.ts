import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as SecureLS from 'secure-ls';
import { SokectIoService } from '../Services/sokect-io.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    ls = new SecureLS({ encodingType: 'aes' });
    token = this.ls.get('token');
    readonly URL_API = environment.url;
    constructor(
        private sokectIoService: SokectIoService,
        private http: HttpClient
    ) { }

    crearNotification(body) {
        const httpOptions = {
            headers: new HttpHeaders({
                ip: this.ls.get('ip').data + '',
                client: 'debug',
                view: 'Crear Notificación'
            })
        };
        const res = this.http.post(this.URL_API + 'Notifications/', body, httpOptions);
        return res;
    }

    crearNotificacion(body) {
        const res = this.crearNotification(body);

        setTimeout(() => {
            this.sokectIoService.IoListarNotificaciones();
        }, 500);

        setTimeout(() => {
            this.sokectIoService.sendNotification(body['dest']);
        }, 500);

        return res;
    }

    listarNotificacionesUsuario(id: string) {
        try {
            const httpOptions = {
                headers: new HttpHeaders({ id: id })
            };
            return this.http.get(this.URL_API + 'Notifications/id', httpOptions)
                .pipe(retry(1), catchError(this.handleError));
        } catch (ex) {
            console.log(ex);
        }
    }

    deleteNotification(id: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                ip: this.ls.get('ip').data,
                client: 'debug',
                view: 'Notifications',
                id: id
            })
        };
        return this.http.delete(this.URL_API + 'Notifications/', httpOptions)
            .pipe(retry(1), catchError(this.handleError));
    }

    updateNotification(id: string) {
        try {
            const httpOptions = {
                headers: new HttpHeaders({
                    ip: this.ls.get('ip').data,
                    client: 'debug',
                    view: 'Notifications',
                    id: id
                })
            };
            return this.http.put(this.URL_API + 'Notifications/', id, httpOptions)
                .pipe(retry(1), catchError(this.handleError));
        } catch (ex) {
            console.log(ex);
        }
    }

    // Error handling
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        alert(errorMessage);
        return throwError(errorMessage);
    }
}
