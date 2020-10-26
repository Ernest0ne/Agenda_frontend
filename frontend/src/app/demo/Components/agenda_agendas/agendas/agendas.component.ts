import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { AgendaModelAdapter } from 'src/app/demo/models/agenda';
import { AgendaService } from 'src/app/demo/Services/agenda.service';
import { ConfigTables } from 'src/app/demo/utilities/config-tables.service';
import { UtilitiesConfigString } from 'src/app/demo/utilities/utilities-config-string.service';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css'],
  providers: [ConfirmationService, MessageService, ConfigTables]
})
export class AgendasComponent implements OnInit {

  display: boolean;
  form: FormGroup;
  agendas = []
  agenda: any
  cols = [];
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;

  constructor(
    public configTables: ConfigTables,
    private confirmationService: ConfirmationService,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    private utilitiesString: UtilitiesConfigString,
    private agendaService: AgendaService,
    private adapter: AgendaModelAdapter
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
      age_nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      age_descripcion: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

  cargarTabla() {
    this.cols = [
      { field: 'age_nombre', header: 'Nombre' },
      { field: 'age_descripcion', header: 'Descripción' },
      { field: 'actions', header: 'Acciones' },
    ];
  }


  get() {
    this.agendaService.listar().subscribe(res => {
      if (res.status) {
        this.agendas = this.utilitiesString.sortAscending(this.adapter.adaptList(res.data), 'age_nombre');
      }
    }, err => {
    });
  }

  delete(data) {
    this.confirmationService.confirm({
      message: this.utilitiesString.msgConfirmDelete + 'la agenda ' + data.age_nombre + '?',
      accept: () => {
        this.agendaService.eliminar(data.age_id).subscribe(resp => {
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
    this.agenda = data;
    this.setData(data);
  }

  setData(data) {
    this.form.get('age_nombre').setValue(data ? data.age_nombre : null);
    this.form.get('age_descripcion').setValue(data ? data.age_descripcion : null);
  }

  save() {
    let obj = this.form.value;
    if (this.agenda) {
      obj['age_id'] = this.agenda.age_id;
      this.agendaService.actualizar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.get();
          this.display = false;
        }
      });
    } else {
      this.agendaService.registrar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.get();
          this.display = false;
        }
      });
    }
  }

  limpiarFormulario() {
    this.agenda = undefined;
    this.form.reset()
  }

}
