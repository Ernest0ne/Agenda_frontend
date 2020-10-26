import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  readonly URL_API = environment.url;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(this.URL_API + 'Agenda') as any;
  }

  registrar(body) {
    return this.http.post(this.URL_API + 'Agenda', body) as any;
  }

  actualizar(body) {
    return this.http.put(this.URL_API + 'Agenda', body) as any;
  }

  eliminar(id) {
    const httpOptions = {
      headers: new HttpHeaders({ age_id: '' + id })
    };
    return this.http.delete(this.URL_API + 'Agenda', httpOptions) as any;
  }

  buscarById(id) {
    const httpOptions = {
      headers: new HttpHeaders({ id: '' + id })
    };
    return this.http.get(this.URL_API + 'Agenda/getById', httpOptions) as any;
  }

}
