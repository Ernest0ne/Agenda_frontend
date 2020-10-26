import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { CitaModelAdapter } from 'src/app/demo/models/cita';
import { CitaService } from 'src/app/demo/Services/cita.service';
import { ConfigTables } from 'src/app/demo/utilities/config-tables.service';
import { UtilitiesConfigString } from 'src/app/demo/utilities/utilities-config-string.service';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  providers: [ConfirmationService, MessageService, ConfigTables]
})
export class CitasComponent implements OnInit {

  display: boolean;
  form: FormGroup;
  citas = []
  cita: any
  cols = [];
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;

  constructor(
    public configTables: ConfigTables,
    private confirmationService: ConfirmationService,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    private utilitiesString: UtilitiesConfigString,
    private citaService: CitaService,
    private adapter: CitaModelAdapter
  ) {
    this.display = false;
  }

  ngOnInit() {
    this.app.mostarMenu();
    this.cargarFormulario()
    this.cargarTabla()
    this.get()
  }


  cargarFormulario() {
    this.form = new FormGroup({
      cit_nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_descripcion: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_estado: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_fecha_agendada: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_hora_fin: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_hora_inicio: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_agenda: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_profesores: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_lugar: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_comentario: new FormControl({ value: null, disabled: false }, []),
      cit_calificacion: new FormControl({ value: null, disabled: false }, [])
    });
  }

  cargarTabla() {
    this.cols = [
      { field: 'cit_nombre', header: 'Nombre' },
      { field: 'cit_fecha_agendada', header: 'F. agendada' },
      { field: 'cit_hora_inicio', header: 'H. incio' },
      { field: 'cit_hora_fin', header: 'H. fin' },
      { field: 'cit_estado', header: 'Estado' },
      { field: 'actions', header: 'Acciones' },
    ];
  }


  get() {
    this.citaService.listar().subscribe(res => {
      if (res.status) {
        this.citas = this.utilitiesString.sortAscending(this.adapter.adaptList(res.data), 'cit_nombre');
      }
    }, err => {
    });
  }

  delete(data) {
    this.confirmationService.confirm({
      message: this.utilitiesString.msgConfirmDelete + 'la cita ' + data.cit_nombre + '?',
      accept: () => {
        this.citaService.eliminar(data.cit_id).subscribe(resp => {
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
    this.cita = data;
    this.setData(data);
  }

  setData(data) {
    this.form.get('cit_nombre').setValue(data ? data.cit_nombre : null);
    this.form.get('cit_descripcion').setValue(data ? data.cit_descripcion : null);
    this.form.get('cit_estado').setValue(data ? data.cit_estado : null);
    this.form.get('cit_fecha_agendada').setValue(data ? data.cit_fecha_agendada : null);
    this.form.get('cit_comentario').setValue(data ? data.cit_comentario : null);
    this.form.get('cit_agenda').setValue(data ? data.cit_agenda : null);
    this.form.get('cit_profesores').setValue(data ? data.cit_profesores : null);
    this.form.get('cit_hora_fin').setValue(data ? data.cit_hora_fin : null);
    this.form.get('cit_hora_inicio').setValue(data ? data.cit_hora_inicio : null);
    this.form.get('cit_lugar').setValue(data ? data.cit_lugar : null);
    this.form.get('cit_calificacion').setValue(data ? data.cit_calificacion : null);
  }

  save() {
    let obj = this.form.value;
    if (this.cita) {
      obj['cit_id'] = this.cita.cit_id;
      this.citaService.actualizar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.get();
          this.display = false;
        }
      });
    } else {
      this.citaService.registrar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.get();
          this.display = false;
        }
      });
    }
  }

  limpiarFormulario() {
    this.cita = undefined;
    this.form.reset()
  }

}
