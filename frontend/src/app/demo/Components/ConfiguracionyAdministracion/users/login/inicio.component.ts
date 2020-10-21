import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/primeng';
// importamos el servicio del empleado
import { UserService } from '../../../../Services/user.service';
import { AppComponent } from '../../../../../app.component';
import * as SecureLS from 'secure-ls';
import { SokectIoService } from '../../../../Services/sokect-io.service';
import { FuncionesGenerales } from '../../../FuncionesGenerales/funcionesGenerales';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class InicioComponent implements OnInit {
    typeInput = 'password';
    ls = null;

    constructor(
        public userService: UserService,
        private funciones: AppComponent,
    ) { }




    ngOnInit() {
        this.ls = new SecureLS({ encodingType: 'aes' });
        this.funciones.ocultarMenu();
      /*   const app_topbar_menu = document.querySelector('.layout-menu-dark');
        app_topbar_menu.classList.add('layout-static-inactive'); */
    }

    loginUser() {

        this.ls.set('token', { data: 'token' });
        this.ls.set('rol', 'rol');
        this.ls.set('name', 'nombre');
        location.href = '#/Shoes/';
    }



    showPassword() {
        if (this.typeInput == 'password') {
            this.typeInput = 'text';
        } else {
            this.typeInput = 'password';
        }
    }


}
