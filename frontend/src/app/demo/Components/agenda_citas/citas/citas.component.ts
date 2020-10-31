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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  providers: [ConfirmationService, MessageService, ConfigTables, DatePipe]
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
  estados = []
  estado: any
  fechaInicio: any
  fechaFin: any
  estadosFiltro = []

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
    private agendaAdapter: AgendaModelAdapter,
    private datePipe: DatePipe
  ) {
    this.estados = this.utilitiesString.statusCitas;
    this.display = false;
    this.estadosFiltro = Object.create(this.estados);
    this.estadosFiltro.push({ label: 'TODOS', value: null })
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
        this.estado = undefined;
        this.fechaInicio = undefined;
        this.fechaFin = undefined;
      }
    }, err => {
    });
  }


  filter() {
    let obj = {
      cit_agenda: this.agenda.age_id,
    }
    if (this.fechaInicio) obj['cit_fecha_agendada_inicio'] = this.datePipe.transform(this.fechaInicio, 'dd-MM-yyyy');
    if (this.fechaFin) obj['cit_fecha_agendada_fin'] = this.datePipe.transform(this.fechaFin, 'dd-MM-yyyy');
    if (this.estado) obj['cit_estado'] = this.estado;

    this.citaService.filter(obj).subscribe(res => {
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
    let dateFin = new Date();
    let date = new Date();

    if (data) {
      let hast = data.cit_fecha_agendada.split("-")
      date = new Date(hast[2] + "-" + hast[1] + "-" + hast[0]);
      date.setDate(date.getDate() + 1);

      dateInicio.setHours(data.cit_hora_inicio.split(":")[0]);
      dateInicio.setMinutes(data.cit_hora_inicio.split(":")[1]);
      dateFin.setHours(data.cit_hora_fin.split(":")[0]);
      dateFin.setMinutes(data.cit_hora_fin.split(":")[1]);
    }

    this.form.get('cit_nombre').setValue(data ? data.cit_nombre : null);
    this.form.get('cit_descripcion').setValue(data ? data.cit_descripcion : null);
    this.form.get('cit_estado').setValue(data ? data.cit_estado : 'AGENDADA');
    this.form.get('cit_fecha_agendada').setValue(data ? date : null);
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

    let horaInicio = new Date(obj.cit_hora_inicio)
    let horaFin = new Date(obj.cit_hora_fin)

    obj.cit_fecha_agendada = this.datePipe.transform(obj.cit_fecha_agendada, 'dd-MM-yyyy')

    obj.cit_hora_fin = this.funcionesGenerales.obtenerHora(horaFin)
    obj.cit_hora_inicio = this.funcionesGenerales.obtenerHora(horaInicio)

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

  exportExcel() {
    let citas = this.citas.map(c => {
      return {
        cit_nombre: c.cit_nombre,
        cit_descripcion: c.cit_descripcion,
        cit_estado: c.cit_estado,
        cit_fecha_agendada: c.cit_fecha_agendada,
        cit_hora_inicio: c.cit_hora_inicio,
        cit_hora_fin: c.cit_hora_fin,
        cit_agenda: c.cit_agenda.nombre,
        cit_lugar: c.cit_lugar,
        cit_comentario: c.cit_comentario,
        cit_calificacion: c.cit_calificacion
      };
    });

    let columns = [
      { field: 'cit_nombre', header: 'Nombre', class: '' },
      { field: 'cit_descripcion', header: 'Descripcion', class: '' },
      { field: 'cit_estado', header: 'Estado', class: '' },
      { field: 'cit_fecha_agendada', header: 'Fecha de Agendada', class: '' },
      { field: 'cit_hora_inicio', header: 'Hora Inicio', class: '' },
      { field: 'cit_hora_fin', header: 'Hora Fin', class: '' },
      { field: 'cit_agenda', header: 'Agenda', class: '' },
      { field: 'cit_lugar', header: 'Lugar', class: '' },
      { field: 'cit_comentario', header: 'Comentario', class: '' },
      { field: 'cit_calificacion', header: 'Calificacion', class: '' }
    ];

    setTimeout(() => {
      this.configTables.exportToExcel(
        undefined,
        'Reporte de citas',
        columns,
        citas
      );
    }, 10);
  }


}
