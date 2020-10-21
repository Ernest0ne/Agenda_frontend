import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as SecureLS from 'secure-ls';


@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  readonly URL_API = environment.url;

  ls = new SecureLS({ encodingType: 'aes' });
  token = this.ls.get('token');

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(this.URL_API + 'Modelo');
  }

  listarAllMaterialModelo(matmo_modelo) {
    const httpOptions = {
      headers: new HttpHeaders({
        matmo_modelo: matmo_modelo
      })
    };
    return this.http.get(this.URL_API + 'Modelo/getAllMaterialModelo', httpOptions);
  }

  listarByTipo(mat_tipo) {
    const httpOptions = {
      headers: new HttpHeaders({
        mat_tipo: mat_tipo
      })
    };
    return this.http.get(this.URL_API + 'Material/getAllByTipo', httpOptions);
  }

  registrar(body) {
    return this.http.post(this.URL_API + 'Modelo', body);
  }

  actualizar(body) {
    return this.http.put(this.URL_API + 'Modelo', body);
  }

}
