import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { CitaModelAdapter } from 'src/app/demo/models/cita';
import { CitaService } from 'src/app/demo/Services/cita.service';
import { ProfesorModelAdapter } from 'src/app/demo/models/profesor';
import { ProfesorService } from 'src/app/demo/Services/profesor.service';
import { AgendaModelAdapter } from 'src/app/demo/models/agenda';
import { AgendaService } from 'src/app/demo/Services/agenda.service';
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
  profesores = []
  agendas = []
  agenda: any;
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
    private adapter: CitaModelAdapter,
    private profesorService: ProfesorService,
    private profesorAdapter: ProfesorModelAdapter,
    private agendarService: AgendaService,
    private agendaAdapter: AgendaModelAdapter
  ) {
    this.display = false;
  }

  ngOnInit() {
    this.app.mostarMenu();
    this.cargarFormulario()
    this.cargarTabla()
    this.getProfesores()
    this.getAgendas();
  }


  cargarFormulario() {
    this.form = new FormGroup({
      cit_nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_descripcion: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_estado: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_fecha_agendada: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_hora_fin: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_hora_inicio: new FormControl({ value: null, disabled: false }, [Validators.required]),
      cit_agenda: new FormControl({ value: null, disabled: false }, []),
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
    this.citaService.listarByAgenda(this.agenda.age_id).subscribe(res => {
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

    let dateInicio = new Date();
    dateInicio.setHours(data.cit_hora_inicio.split(":")[0]);
    dateInicio.setMinutes(data.cit_hora_inicio.split(":")[1]);

    let dateFin = new Date();
    dateFin.setHours(data.cit_hora_fin.split(":")[0]);
    dateFin.setMinutes(data.cit_hora_fin.split(":")[1]);


    this.form.get('cit_nombre').setValue(data ? data.cit_nombre : null);
    this.form.get('cit_descripcion').setValue(data ? data.cit_descripcion : null);
    this.form.get('cit_estado').setValue(data ? data.cit_estado : null);
    this.form.get('cit_fecha_agendada').setValue(data ? data.cit_fecha_agendada : null);
    this.form.get('cit_comentario').setValue(data ? data.cit_comentario : null);
    this.form.get('cit_agenda').setValue(data ? data.cit_agenda : null);
    this.form.get('cit_profesores').setValue(data ? data.cit_profesores : null);
    this.form.get('cit_hora_fin').setValue(data ? dateFin : null);
    this.form.get('cit_hora_inicio').setValue(data ? dateInicio : null);
    this.form.get('cit_lugar').setValue(data ? data.cit_lugar : null);
    this.form.get('cit_calificacion').setValue(data ? data.cit_calificacion : null);
  }

  save() {
    let obj = this.form.value;
    obj.cit_agenda = {
      id: this.agenda.age_id,
      nombre: this.agenda.age_nombre
    }


    console.log(obj);

    let date = new Date(obj.cit_fecha_agendada)
    let horaInicio = new Date(obj.cit_hora_inicio)
    let horaFin = new Date(obj.cit_hora_fin)

    console.log(obj);

    let dia = date.getDay().toString.length < 2 ? "0" + date.getDay() : "" + date.getDay()
    let mes = date.getMonth().toString.length < 2 ? "0" + date.getMonth() : "" + date.getMonth()

    obj.cit_fecha_agendada = dia + "-" + mes + "-" + date.getFullYear

    obj.cit_hora_fin = horaFin.getHours() + ":" + horaFin.getMinutes()
    obj.cit_hora_inicio = horaInicio.getHours() + ":" + horaInicio.getMinutes()


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

  getProfesores() {
    this.profesorService.listar().subscribe(res => {
      if (res.status) {
        this.profesores = this.utilitiesString.sortAscending(this.profesorAdapter.adaptList(res.data), 'pro_nombre');
        console.log(this.profesores);

        this.profesores = this.profesores.map(c => {
          return {
            value: c.pro_id,
            label: c.pro_nombre
          };
        });
      }
    }, err => {
    });
  }


  getAgendas() {
    this.agendarService.listar().subscribe(res => {
      if (res.status) {
        this.agendas = this.utilitiesString.sortAscending(this.agendaAdapter.adaptList(res.data), 'pro_nombre');
        this.agenda = this.agendas[0]
        this.get()
      }
    }, err => {
    });
  }

}
