import { Component, OnInit, HostListener } from '@angular/core';
import { AppComponent } from '../../app.component';
import * as SecureLS from 'secure-ls';
import { FuncionesGenerales } from '../../../app/demo/Components/FuncionesGenerales/funcionesGenerales';
import { DasboardService } from '../Services/dasboard.service';
import { Svg } from '../svgPath/svg';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { EventService } from '../Services/eventservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/angular';
import { UtilitiesConfigString } from '../utilities/utilities-config-string.service';
import { CitaService } from '../Services/cita.service';
import { CitaModelAdapter } from '../models/cita';





@Component({
  templateUrl: './emptydemo.component.html',
  providers: [FuncionesGenerales, MessageService]
})
export class EmptyDemoComponent implements OnInit {
  ls = new SecureLS({ encodingType: 'aes' });

  widthScreen = 0;
  msgs: Message[] = [];
  dataConteiner: any;
  events: any[];
  options: any;
  citas = [];
  calendarOptions: CalendarOptions

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  constructor(
    public svg: Svg,
    public funcionesGenerales: FuncionesGenerales,
    public dasboardService: DasboardService,
    private app: AppComponent,
    private funciones: AppComponent,
    private utilitiesString: UtilitiesConfigString,
    private citaService: CitaService,
    private adapter: CitaModelAdapter,
  ) {
  }

  ngOnInit() {
    this.app.chargeBreadcrum('', null);
    this.app.setTitleMobile('INICIO');
    this.funciones.mostarMenu();
    this.dataConteiner = this.svg.returnMain();

    this.getByEstado();
  }


  getByEstado() {
    this.citaService.buscarByEstado('AGENDADA').subscribe(res => {
      if (res.status) {
        this.citas = this.utilitiesString.sortAscending(this.adapter.adaptList(res.data), 'cit_nombre');
        this.events = this.citas.map(c => {
          return {
            title: c.cit_nombre,
            date: c.cit_fecha_agendada.split('-')[2] + "-" + c.cit_fecha_agendada.split('-')[1] + "-" + c.cit_fecha_agendada.split('-')[0]
          };
        });
        this.calendarOptions = {
          initialView: 'dayGridMonth',
          locale: 'es',
          events: this.events
        };
      }
    }, err => {
    });
  }

}
