import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class RegistrosGeneralesService {
  readonly URL_API = environment.url;

  ls = new SecureLS({ encodingType: 'aes' });
  token = this.ls.get('token');

  constructor(private http: HttpClient) { }

  listarByTipo(tipo) {
    const httpOptions = {
      headers: new HttpHeaders({
        rege_tipo: tipo
      })
    };
    return this.http.get(this.URL_API + 'RegistrosGenerales/getByTipo', httpOptions);
  }

  listar() {
    return this.http.get(this.URL_API + 'RegistrosGenerales');
  }

  registrar(body) {
    return this.http.post(this.URL_API + 'RegistrosGenerales', body);
  }

  actualizar(body) {
    return this.http.put(this.URL_API + 'RegistrosGenerales', body);
  }

  registrarPrecioReferencia(body) {
    return this.http.post(this.URL_API + 'RegistrosGenerales', body);
  }

  listarPreciosReferencias() {
    return this.http.get(this.URL_API + 'RegistrosGenerales/getPreciosReferencias');
  }

  listarPrecioByReferencia(prere_referencia) {
    const httpOptions = {
      headers: new HttpHeaders({
        prere_referencia: prere_referencia
      })
    };
    return this.http.get(this.URL_API + 'RegistrosGenerales/getPreciosReferenciasById', httpOptions);
  }

}



