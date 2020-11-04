import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { ProfesorModelAdapter } from 'src/app/demo/models/profesor';
import { ProfesorService } from 'src/app/demo/Services/profesor.service';
import { ConfigTables } from 'src/app/demo/utilities/config-tables.service';
import { UtilitiesConfigString } from 'src/app/demo/utilities/utilities-config-string.service';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css'],
  providers: [ConfirmationService, MessageService, ConfigTables]
})
export class ProfesoresComponent implements OnInit {

  display: boolean;
  form: FormGroup;
  profesores = []
  profesor: any
  cols = [];
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;
  departamentos = [];
  facultades = [];

  constructor(
    public configTables: ConfigTables,
    private confirmationService: ConfirmationService,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    public utilitiesString: UtilitiesConfigString,
    private profesorService: ProfesorService,
    private adapter: ProfesorModelAdapter
  ) {
    this.display = false;
    this.facultades = this.utilitiesString.facultades;
  }

  ngOnInit() {
    this.app.mostarMenu();
    this.cargarFormulario()
    this.cargarTabla()
    this.get()

  }


  cargarFormulario() {
    this.form = new FormGroup({
      pro_nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      pro_apellido: new FormControl({ value: null, disabled: false }, [Validators.required]),
      pro_correo: new FormControl({ value: null, disabled: false }, [Validators.required]),
      pro_facultad: new FormControl({ value: null, disabled: false }, [Validators.required]),
      pro_departamento: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });
  }

  cargarTabla() {
    this.cols = [
      { field: 'pro_nombre', header: 'Nombre' },
      { field: 'pro_apellido', header: 'Apellido' },
      { field: 'pro_correo', header: 'Correo' },
      { field: 'actions', header: 'Acciones' },
    ];
  }


  get() {
    this.profesorService.listar().subscribe(res => {
      if (res.status) {
        this.profesores = this.utilitiesString.sortAscending(this.adapter.adaptList(res.data), 'pro_nombre');
      }
    }, err => {
    });
  }

  delete(data) {
    this.confirmationService.confirm({
      message: this.utilitiesString.msgConfirmDelete + 'el profesor ' + data.pro_nombre + '?',
      accept: () => {
        this.profesorService.eliminar(data.pro_id).subscribe(resp => {
          if (resp.status) {
            this.funcionesGenerales.showSuccessViaToast(resp.message)
            this.get();
          }
        }, err => {
          this.funcionesGenerales.showSuccessViaToast(err.error['message']);
        });
      }
    });
  }


  addOrEdit(data) {
    this.show(data);
  }

  show(data) {
    this.display = true;
    this.profesor = data;
    this.setData(data);
  }

  setData(data) {
    this.form.get('pro_nombre').setValue(data ? data.pro_nombre : null);
    this.form.get('pro_apellido').setValue(data ? data.pro_apellido : null);
    this.form.get('pro_correo').setValue(data ? data.pro_correo : null);
    this.form.get('pro_facultad').setValue(data ? data.pro_facultad : null);
    this.form.get('pro_departamento').setValue(data ? data.pro_departamento : null);
  }

  save() {
    let obj = this.form.value;
    if (this.profesor) {
      obj['pro_id'] = this.profesor.pro_id;
      this.profesorService.actualizar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.get();
          this.display = false;
        }
      });
    } else {
      this.profesorService.registrar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.get();
          this.display = false;
        }
      });
    }
  }

  limpiarFormulario() {
    this.profesor = undefined;
    this.form.reset()
  }

  getDepartamento() {
    this.departamentos = this.utilitiesString.departamentos.filter(c => c.facultad === this.form.get('pro_facultad').value)
  }

}
