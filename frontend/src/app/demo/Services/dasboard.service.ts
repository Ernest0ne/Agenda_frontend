import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as SecureLS from 'secure-ls';

@Injectable({
    providedIn: 'root'
})
export class DasboardService {
    readonly URL_API = environment.url;

    ls = new SecureLS({ encodingType: 'aes' });
    token = this.ls.get('token');

    constructor(private http: HttpClient) { }

    cargarDashboards() {
        return this.http.get(this.URL_API + 'Dasboard');
    }

    cargarGraficosDashboard(dashboard) {
        const httpOptions = {
            headers: new HttpHeaders({ dashboard: '' + dashboard.id + '' })
        };
        return this.http.get(this.URL_API + 'Dasboard/graficos', httpOptions);
    }

    cargarSubgraficos(grafico) {
        const httpOptions = {
            headers: new HttpHeaders({ grafico: '' + grafico.id + '' })
        };
        return this.http.get(this.URL_API + 'Dasboard/graficos/subgraficos', httpOptions);
    }

    cargarDashboardUser(usercode) {
        const httpOptions = {
            headers: new HttpHeaders({ usercode: '' + usercode + '' })
        };
        return this.http.get(this.URL_API + 'Dasboard/obtenerusers_dashboard', httpOptions);
    }

    guardarDashboardUser(body, usercode) {
        const httpOptions = {
            headers: new HttpHeaders({ usercode: '' + usercode + '' })
        };

        return this.http.post(this.URL_API + 'Dasboard/guardar', body, httpOptions);
    }
}
