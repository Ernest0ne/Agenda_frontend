import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { RegistrosGeneralesService } from '../../../Services/registros-generales.service';
import { RegistroGeneral } from '../../../models/registroGeneral';

@Component({
  selector: 'app-price-tiquete',
  templateUrl: './price-tiquete.component.html',
  styleUrls: ['./price-tiquete.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PriceTiqueteComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private service: MessageService,
    private formBuilder: FormBuilder,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    public RegistrosGeneralesService: RegistrosGeneralesService
  ) { }


  display: boolean;

  precioCortada = '';
  precioGuarnicion = '';
  precioMontada = '';
  precioLimpiada = '';
  title = '';

  preciosReferencias = []
  cols = [];
  tipos = [];
  referencias = [];
  placeholderTipo = 'Seleccionar';
    
  public RegistroGeneral: RegistroGeneral;
  
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;

  ngOnInit() {
    this.RegistroGeneral = new RegistroGeneral();
    this.validar_permisos();
    this.cargarTabla();
    this.getReferencias();
  }

  validar_permisos() {
    const permisos = this.ls.get('TabladePrecios');
    if (permisos != null) {
      const permiso = permisos.split('-');
      for (let i = 0; i < permiso.length; i++) {
        if (permiso[i] == 'Tabla de Precios') {

        }
      }
    } else {
      location.href = '/#/Shoes/accessDenied';
    }
  }

  cargarTabla() {

    this.tipos = [
      { label: 'COLOR', value: 'COLOR' },
      { label: 'REFERENCIA', value: 'REFERENCIA' },
      { label: 'MATERIAL', value: 'MATERIAL' },
      { label: 'PLANTA', value: 'PLANTA' },
    ];

    this.cols = [
      { field: 'prere_referencia_nombre', header: 'Referencia', class: '' },
      { field: 'prere_precio_cortada', header: 'Cortada', class: '' },
      { field: 'prere_precio_guarnicion', header: 'Guarnición', class: '' },
      { field: 'prere_precio_montada', header: 'Montada', class: '' },
      { field: 'prere_precio_limpiada', header: 'Limpiada', class: '' },
      { field: 'actualizar', header: 'Actualizar', class: 'thIcons' }
    ];
  }

  getReferencias() {
    this.RegistrosGeneralesService.listarByTipo('REFERENCIA').subscribe(res => {
      this.referencias = res['data'] as [];
      this.referencias.sort((a, b) => {
        if (a.rege_nombre > b.rege_nombre) return 1;
        if (a.rege_nombre < b.rege_nombre) return -1;
        return 0;
      });
      this.getPreciosReferencias();
    });
  }

  getPreciosReferencias() {
    this.RegistrosGeneralesService.listarPreciosReferencias().subscribe(res => {
      this.preciosReferencias = res['data'] as [];
      for (let i = 0; i < this.preciosReferencias.length; i++) {
        this.preciosReferencias[i]['prere_referencia_nombre'] = this.referencias.filter(c => c.rege_id == this.preciosReferencias[i]['prere_referencia'])[0]['rege_nombre']
      }
    });
  }

  iniciarActualizacion(rowData) {
    this.RegistroGeneral = new RegistroGeneral();
    this.RegistroGeneral.rege_id = rowData.prere_referencia;
    this.RegistroGeneral.rege_nombre = rowData.prere_referencia_nombre;
    this.cargarPreciosReferencia(rowData.prere_referencia);
    this.title = "EDITAR";
    this.display = true;
  }

  actualizarPreciosReferencia() {
    this.RegistroGeneral.prere_cortada = this.precioCortada;
    this.RegistroGeneral.prere_guarnicion = this.precioGuarnicion;
    this.RegistroGeneral.prere_montada = this.precioMontada;
    this.RegistroGeneral.prere_limpiada = this.precioLimpiada;
    this.RegistroGeneral.rege_tipo = 'REFERENCIA';
    this.RegistrosGeneralesService.actualizar(this.RegistroGeneral).subscribe(res => {
      if (res['status']) {
        this.limpiarFormulario();
        return this.funcionesGenerales.showSuccessViaToast(res['message']);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });
  }

  cargarPreciosReferencia(referencia) {
    this.RegistrosGeneralesService.listarPrecioByReferencia(referencia).subscribe(res => {
      if (res['status']) {
        this.precioCortada = res['data'][0].prere_precio_cortada
        this.precioGuarnicion = res['data'][0].prere_precio_guarnicion
        this.precioMontada = res['data'][0].prere_precio_montada
        this.precioLimpiada = res['data'][0].prere_precio_limpiada
      }
    });
  }


  limpiarFormulario() {
    this.display = false;
    this.RegistroGeneral = new RegistroGeneral();
    this.getPreciosReferencias();
    this.precioCortada = '';
    this.precioGuarnicion = '';
    this.precioMontada = '';
    this.precioLimpiada = '';
  }

  formatearMoneda() {
    this.precioCortada = this.funcionesGenerales.formatoMonedaText(this.precioCortada);
    this.precioGuarnicion = this.funcionesGenerales.formatoMonedaText(this.precioGuarnicion);
    this.precioMontada = this.funcionesGenerales.formatoMonedaText(this.precioMontada);
    this.precioLimpiada = this.funcionesGenerales.formatoMonedaText(this.precioLimpiada);
  }

}
