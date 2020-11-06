import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { UsuarioModelAdapter } from 'src/app/demo/models/usuario';
import { UserService } from 'src/app/demo/Services/user.service';
import { ConfigTables } from 'src/app/demo/utilities/config-tables.service';
import { UtilitiesConfigString } from 'src/app/demo/utilities/utilities-config-string.service';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [ConfirmationService, MessageService, ConfigTables]
})
export class UsuarioComponent implements OnInit {


  display: boolean;
  form: FormGroup;
  formClave: FormGroup;
  usuarios = []
  usuario: any
  cols = [];
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;

  constructor(
    private confirmationService: ConfirmationService,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    public utilitiesString: UtilitiesConfigString,
    private usuarioService: UserService,
    private adapter: UsuarioModelAdapter
  ) {
    this.display = false;
  }

  ngOnInit() {
    this.app.mostarMenu();
    this.cargarFormulario()
    this.cargarFormularioClave()
    this.usuario = this.ls.get("usuario");
    this.setData(this.usuario)
  }


  cargarFormulario() {
    this.form = new FormGroup({
      usu_nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      usu_apellido: new FormControl({ value: null, disabled: false }, [Validators.required]),
      usu_correo: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

  cargarFormularioClave() {
    this.formClave = new FormGroup({
      usu_clave: new FormControl({ value: null, disabled: false }, [Validators.required]),
      usu_login: new FormControl({ value: null, disabled: false }, [Validators.required]),
      usu_clave_nueva: new FormControl({ value: null, disabled: false }, [Validators.required]),
      usu_clave_nueva_confirmacion: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

  setData(data) {
    this.form.get('usu_nombre').setValue(data ? data.usu_nombre : null);
    this.form.get('usu_apellido').setValue(data ? data.usu_apellido : null);
    this.form.get('usu_correo').setValue(data ? data.usu_correo : null);
  }

  save() {
    let obj = this.form.value;
    if (this.usuario) {
      obj['usu_id'] = this.usuario.usu_id;
      this.usuarioService.actualizar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.display = false;
        }
      });
    } else {
      this.usuarioService.registrar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.display = false;
        }
      });
    }
  }

  limpiarFormulario() {
    this.formClave.reset()
  }

  updateClave() {
    this.formClave.get('usu_login').setValue(this.usuario.usu_correo);
    this.display = true;
  }

  saveClave() {
    let obj = this.formClave.value;

    if (obj.usu_clave_nueva_confirmacion != obj.usu_clave_nueva) {
      this.funcionesGenerales.showErrorViaToast("La nueva contraseña con coincide")
      return;
    }

    this.usuarioService.actualizarClave(obj).subscribe(resp => {
      if (resp.status) {
        this.funcionesGenerales.showSuccessViaToast(resp.message)
        this.display = false;
      }
    });
  }

}
