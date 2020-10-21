import { Injectable } from '@angular/core';

// importamos un modulo para poder comunicarnos con el backend
import { HttpClient } from '@angular/common/http';
// importamos el modelo Usuario
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import * as SecureLS from 'secure-ls';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    ls = new SecureLS({ encodingType: 'aes' });
    selectedUser: User;
    Users: User[];

    readonly URL_API = environment.url;

    constructor(private service: MessageService, private http: HttpClient) {
        this.selectedUser = new User();
    }

    login(user) {
        return this.http.post(this.URL_API + 'Usuario/Login', user);
    }
    
}
