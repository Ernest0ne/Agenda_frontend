import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { EmpleadosService } from '../../../Services/empleados.service';
import { Pago } from '../../../models/pago';


@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class NominaComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private service: MessageService,
    public funcionesGenerales: FuncionesGenerales,
    public EmpleadosService: EmpleadosService
  ) { }

  display: boolean;
  viwer: boolean;

  title = '';
  pagos = [];
  cols = [];
  areas = [];
  tickets = [];
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;

  public Pago: Pago;

  ngOnInit() {
    this.validar_permisos();
    this.cargarTabla();
    this.getPagos();
    this.Pago = new Pago();
  }

  validar_permisos() {
    const permisos = this.ls.get('Nómina');
    if (permisos != null) {
      const permiso = permisos.split('-');
      for (let i = 0; i < permiso.length; i++) {
        if (permiso[i] == 'Nómina') {
        }
      }
    } else {
      location.href = '/#/Shoes/accessDenied';
    }
  }

  cargarTabla() {
    this.areas = [
      { label: 'CORTADA', value: 'CORTADA' },
      { label: 'GUARNICIÓN', value: 'GUARNICIÓN' },
      { label: 'LIMPIADA', value: 'LIMPIADA' },
      { label: 'MONTADA', value: 'MONTADA' },
    ];
    this.cols = [
      { field: 'pag_empleado_nombre', header: 'Empleado', class: '' },
      { field: 'pag_area', header: 'Area', class: '' },
      { field: 'pag_valor_pago', header: 'Valor pago', class: '' },
      { field: 'pag_cantidad_tiquetes', header: 'Cantidad tickets', class: '' },
      { field: 'pag_fecha', header: 'Fecha', class: '' },
      { field: 'visualizar', header: 'Visualizar', class: 'thIcons' }
    ];
  }

  getPagos() {
    this.EmpleadosService.listarPagos().subscribe(res => {
      if (res['status']) {
        this.pagos = res['data'] as [];

        for (let i = 0; i < this.pagos.length; i++) {
          this.pagos[i]['pag_empleado_nombre'] = this.pagos[i].pag_empleado.nombre;
          this.pagos = this.pagos.filter(c => c)
        }

        this.pagos.sort((a, b) => {
          if (a.pag_fecha < b.pag_fecha) return 1;
          if (a.pag_fecha > b.pag_fecha) return -1;
          return 0;
        });
        this.totalRegistros = this.pagos.length;
      }
    });
  }

  verPago(rowData) {
    this.Pago = rowData;
    this.tickets = JSON.parse(this.Pago.pag_tiquetes);
    console.log(this.tickets)
    this.title = "VISUALIZAR";
    this.display = true;
    this.viwer = true;
  }

  limpiarFormulario() {
    this.display = false;
    this.viwer = false;
    this.Pago = new Pago();
  }

}
