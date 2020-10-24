import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/primeng';
// importamos el servicio del empleado
import { UserService } from '../../../../Services/user.service';
import { AppComponent } from '../../../../../app.component';
import * as SecureLS from 'secure-ls';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModelAdapter } from 'src/app/demo/models/login';



@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class InicioComponent implements OnInit {
    typeInput = 'password';
    ls = null;
    restablecerContrasena = false;
    form: FormGroup;
    login: any

    constructor(
        public userService: UserService,
        private funciones: AppComponent,
        private adapter: LoginModelAdapter
    ) { }

    ngOnInit() {
        this.ls = new SecureLS({ encodingType: 'aes' });
        this.funciones.ocultarMenu();
        this.form = new FormGroup({
            usu_clave: new FormControl({ value: null, disabled: false }, [Validators.required]),
            usu_login: new FormControl({ value: null, disabled: false }, [Validators.required]),
        });
    }

    loginUser() {

        this.login = this.form.value;

        this.userService.login(this.adapter.adaptObjectSend(this.login)).subscribe(resp => {
            if (resp.status) {
                this.ls.set('token', resp.token);
                this.ls.set('usuario', resp.usuario);
                location.href = '#/AgendApp/';
            }
        });


    }



    showPassword() {
        if (this.typeInput == 'password') {
            this.typeInput = 'text';
        } else {
            this.typeInput = 'password';
        }
    }


    mostarModalRestablecer() {
        this.restablecerContrasena = true;
    }


    limpiarModal() {
        this.restablecerContrasena = false;
    }

}
