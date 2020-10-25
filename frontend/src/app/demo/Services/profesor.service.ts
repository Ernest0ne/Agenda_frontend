import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as SecureLS from 'secure-ls';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  readonly URL_API = environment.url;

  ls = new SecureLS({ encodingType: 'aes' });
  token = this.ls.get('token');

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(this.URL_API + 'Profesor') as any;
  }

  registrar(body) {
    return this.http.post(this.URL_API + 'Profesor', body) as any;
  }


  actualizar(body) {
    return this.http.put(this.URL_API + 'Profesor', body) as any;
  }


  eliminar(id) {
    const httpOptions = {
      headers: new HttpHeaders({ pro_id: '' + id })
    };
    return this.http.delete(this.URL_API + 'Profesor', httpOptions) as any;
  }

  buscarById(id) {
    const httpOptions = {
      headers: new HttpHeaders({ id: '' + id })
    };
    return this.http.get(this.URL_API + 'Profesor/getById', httpOptions) as any;
  }

}
