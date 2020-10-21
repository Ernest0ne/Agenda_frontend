import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  readonly URL_API = environment.url;

  ls = new SecureLS({ encodingType: 'aes' });
  token = this.ls.get('token');

  constructor(private http: HttpClient) { }

  listarByArea(area) {
    const httpOptions = {
      headers: new HttpHeaders({
        emp_area: area
      })
    };
    return this.http.get(this.URL_API + 'Empleado/getByArea', httpOptions);
  }

  registrar(body) {
    return this.http.post(this.URL_API + 'Empleado', body);
  }

  actualizar(body) {
    return this.http.put(this.URL_API + 'Empleado', body);
  }

  actualizarEstado(body) {
    return this.http.put(this.URL_API + 'Empleado/updateEstado', body);
  }


  listar() {
    return this.http.get(this.URL_API + 'Empleado');
  }

  buscarById(id) {
    const httpOptions = {
      headers: new HttpHeaders({ id: '' + id })
    };
    return this.http.get(this.URL_API + 'Empleado/getById', httpOptions);
  }

  listarPagos() {
    return this.http.get(this.URL_API + 'Empleado/getAllPagos');
  }

}

