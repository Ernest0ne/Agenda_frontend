import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class TiqueteService {
  readonly URL_API = environment.url;

  ls = new SecureLS({ encodingType: 'aes' });
  token = this.ls.get('token');

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(this.URL_API + 'Tiquete');
  }

  registrar(body) {
    return this.http.post(this.URL_API + 'Tiquete', body);
  }

  buscarById(id) {
    const httpOptions = {
      headers: new HttpHeaders({ id: '' + id })
  };
    return this.http.get(this.URL_API + 'Tiquete/getById', httpOptions);
  }

  actualizar(body) {
    return this.http.put(this.URL_API + 'Tiquete', body);
  }

  actualizarEstado(body) {
    return this.http.put(this.URL_API + 'Tiquete/updateStatus', body);
  }

  buscarTiquetEmpleadoByCodigo(body) {
    const httpOptions = {
      headers: new HttpHeaders(body)
  };
    return this.http.get(this.URL_API + 'Tiquete/getTiqemByCodigo', httpOptions);
  }

  pagarTiquetes(body) {
    return this.http.put(this.URL_API + 'Tiquete/pay', body);
  }

}
