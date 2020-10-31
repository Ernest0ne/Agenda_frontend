import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CitaService {

  readonly URL_API = environment.url;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(this.URL_API + 'Cita') as any;
  }

  listarByAgenda(id) {
    const httpOptions = {
      headers: new HttpHeaders({ cit_age_id: '' + id })
    };
    return this.http.get(this.URL_API + 'Cita/getByAgenda', httpOptions) as any;
  }

  registrar(body) {
    return this.http.post(this.URL_API + 'Cita', body) as any;
  }

  actualizar(body) {
    return this.http.put(this.URL_API + 'Cita', body) as any;
  }

  eliminar(id) {
    const httpOptions = {
      headers: new HttpHeaders({ cit_id: '' + id })
    };
    return this.http.delete(this.URL_API + 'Cita', httpOptions) as any;
  }

  buscarById(id) {
    const httpOptions = {
      headers: new HttpHeaders({ id: '' + id })
    };
    return this.http.get(this.URL_API + 'Cita/getById', httpOptions) as any;
  }

  buscarByEstado(estado) {
    const httpOptions = {
      headers: new HttpHeaders({ cit_estado: '' + estado })
    };
    return this.http.get(this.URL_API + 'Cita/getByEstado', httpOptions) as any;
  }

  filter(header) {
    const httpOptions = {
      headers: new HttpHeaders(header)
    };
    return this.http.get(this.URL_API + 'Cita/Filter', httpOptions) as any;
  }

}
