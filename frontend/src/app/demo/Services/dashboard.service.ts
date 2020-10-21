import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as SecureLS from 'secure-ls';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    ls = new SecureLS({ encodingType: 'aes' });
    token = this.ls.get('token');
    readonly URL_API = environment.url;
    constructor(private http: HttpClient) { }

    dibujarDashboard(usercode: string) {
        const httpOptions = {
            headers: new HttpHeaders({})
        };
        const body = {
            usercode: usercode
        };
        return this.http.post(this.URL_API + 'Dashboard', body, httpOptions)
            .pipe(retry(1), catchError(this.handleError));
    }

    graficoIncidencias(type, usercode: string) {
        const httpOptions = {
            headers: new HttpHeaders({ usercode: this.ls.get('user_code') })
        };
        const body = {
            type: type,
            usercode: usercode,
            url: 'Grafico/Dash'
        };
        return this.http
            .post(this.URL_API + 'Dashboard/graficoIncidencias', body, httpOptions)
            .pipe(retry(1), catchError(this.handleError));
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
