import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { NotaModelAdapter } from 'src/app/demo/models/nota';
import { NotaService } from 'src/app/demo/Services/nota.service';
import { ConfigTables } from 'src/app/demo/utilities/config-tables.service';
import { UtilitiesConfigString } from 'src/app/demo/utilities/utilities-config-string.service';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
  providers: [ConfirmationService, MessageService, ConfigTables]
})
export class NotasComponent implements OnInit {

  display: boolean;
  form: FormGroup;
  notas = []
  nota: any
  cols = [];
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;

  constructor(
    public configTables: ConfigTables,
    private confirmationService: ConfirmationService,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    private utilitiesString: UtilitiesConfigString,
    private notaService: NotaService,
    private adapter: NotaModelAdapter
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
      not_nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      not_descripcion: new FormControl({ value: null, disabled: false }, [Validators.required])
    });
  }

  cargarTabla() {
    this.cols = [
      { field: 'not_nombre', header: 'Nombre' },
      { field: 'not_descripcion', header: 'Descripción' },
      { field: 'actions', header: 'Acciones' },
    ];
  }


  get() {
    this.notaService.listar().subscribe(res => {
      if (res.status) {
        this.notas = this.utilitiesString.sortAscending(this.adapter.adaptList(res.data), 'not_nombre');
      }
    }, err => {
    });
  }

  delete(data) {
    this.confirmationService.confirm({
      message: this.utilitiesString.msgConfirmDelete + 'la nota ' + data.not_nombre + '?',
      accept: () => {
        this.notaService.eliminar(data.not_id).subscribe(resp => {
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
    this.nota = data;
    this.setData(data);
  }

  setData(data) {
    this.form.get('not_nombre').setValue(data ? data.not_nombre : null);
    this.form.get('not_descripcion').setValue(data ? data.not_descripcion : null);
  }

  save() {
    let obj = this.form.value;
    if (this.nota) {
      obj['not_id'] = this.nota.not_id;
      this.notaService.actualizar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.get();
          this.display = false;
        }
      });
    } else {
      this.notaService.registrar(this.adapter.adaptObjectSend(obj)).subscribe(resp => {
        if (resp.status) {
          this.funcionesGenerales.showSuccessViaToast(resp.message)
          this.get();
          this.display = false;
        }
      });
    }
  }

  limpiarFormulario() {
    this.nota = undefined;
    this.form.reset()
  }

}
