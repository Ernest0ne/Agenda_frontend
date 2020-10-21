import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { RegistrosGeneralesService } from '../../../Services/registros-generales.service';
import { RegistroGeneral } from '../../../models/registroGeneral';
import { MaterialService } from '../../../Services/material.service';
import { Material } from '../../../models/material';
import { ModeloService } from '../../../Services/modelo.service';
import { Modelo } from '../../../models/modelo';



@Component({
  selector: 'app-save-registros-generales',
  templateUrl: './save-registros-generales.component.html',
  styleUrls: ['./save-registros-generales.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SaveRegistrosGeneralesComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private service: MessageService,
    private formBuilder: FormBuilder,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    public RegistrosGeneralesService: RegistrosGeneralesService,
    public MaterialService: MaterialService,
    public ModeloService: ModeloService
  ) { }


  display: boolean;
  viwer: boolean;
  regReferencia: boolean;
  regModelo: boolean;
  regColor: boolean;
  regPlanta: boolean;


  title = '';

  registrosGenerales = []
  cols = [];
  tipos = [];
  colores = [];
  plantas = [];
  referencias = [];
  tipoMaterial = [];
  materiales = [];

  colsMateriales = [];
  MaterialesModelo = [];
  preciosReferencias = [];


  public RegistroGeneral: RegistroGeneral;

  public Material: Material

  public Modelo: Modelo;

  selectedTipo;
  placeholderTipo = 'Seleccionar Tipo de registro';
  placeholderColor = 'Seleccionar color';
  placeholderPlanta = 'Seleccionar planta';
  placeholderReferencia = 'Seleccionar referencia';

  selectedColor;
  selectedPlanta;
  selectedReferencia;
  rege_nombre = '';
  selectedTipoMaterial;
  selectedMaterial;

  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;


  precioCortada = '';
  precioGuarnicion = '';
  precioMontada = '';
  precioLimpiada = '';

  cantidad = '';

  ngOnInit() {
    this.validar_permisos();
    this.selectedTipo = 'MODELO'
    this.validarModelo();
    this.RegistroGeneral = new RegistroGeneral();
    this.Material = new Material();
    this.Modelo = new Modelo();
  }


  listarModelos() {
    this.ModeloService.listar().subscribe(res => {
      this.registrosGenerales = res['data'] as [];
      this.registrosGenerales.sort((a, b) => {
        if (a.mod_nombre > b.mod_nombre) return 1;
        if (a.mod_nombre < b.mod_nombre) return -1;
        return 0;
      });

      for (let i = 0; i < this.registrosGenerales.length; i++) {
        this.registrosGenerales[i]['mod_planta_nombre'] = this.registrosGenerales[i].mod_planta['nombre']
        this.registrosGenerales[i]['mod_referencia_nombre'] = this.registrosGenerales[i].mod_referencia['nombre']
        this.registrosGenerales = this.registrosGenerales.filter(c => c);
      }
      this.totalRegistros = this.registrosGenerales.length;
    });
  }


  listarMateriales() {
    this.MaterialService.listar().subscribe(res => {
      this.registrosGenerales = res['data'] as [];
      this.registrosGenerales.sort((a, b) => {
        if (a.mat_nombre > b.mat_nombre) return 1;
        if (a.mat_nombre < b.mat_nombre) return -1;
        return 0;
      });
      this.totalRegistros = this.registrosGenerales.length;
    });
  }

  cargarTabla() {
    this.tipos = [
      { label: 'COLOR', value: 'COLOR' },
      { label: 'REFERENCIA', value: 'REFERENCIA' },
      { label: 'MATERIAL', value: 'MATERIAL' },
      { label: 'MODELO', value: 'MODELO' },
      { label: 'PLANTA', value: 'PLANTA' },
    ];

    this.tipoMaterial = [
      { label: 'CORDÓN', value: 'CORDÓN' },
      { label: 'HILO', value: 'HILO' },
      { label: 'TELA', value: 'TELA' },
      { label: 'PEGANTE', value: 'PEGANTE' },
    ]

    this.cols = [
      { field: 'mod_nombre', header: 'Nombre', class: '' },
      { field: 'mod_planta_nombre', header: 'Planta', class: '' },
      { field: 'mod_referencia_nombre', header: 'Referencia', class: '' },
      { field: 'mod_fecha_creacion', header: 'Fecha c.', class: '' },
      { field: 'actualizar', header: 'Actualizar', class: 'thIcons' }
    ];

  }

  validar_permisos() {
    const permisos = this.ls.get('RegistrosGenerales');
    if (permisos != null) {
      const permiso = permisos.split('-');
      for (let i = 0; i < permiso.length; i++) {
        if (permiso[i] == 'Registros Generales') {

        }
      }
    } else {
      location.href = '/#/Shoes/accessDenied';
    }
  }


  iniciarRegistro() {
    this.placeholderTipo = 'Seleccionar Tipo de registro';
    this.placeholderColor = 'Seleccionar color';
    this.placeholderPlanta = 'Seleccionar planta';
    this.placeholderReferencia = 'Seleccionar referencia';
    this.rege_nombre = '';
    this.viwer = false;
    this.display = !this.display;
    this.title = 'REGISTRAR'
    this.RegistroGeneral = new RegistroGeneral();
    this.Material = new Material();
    this.precioCortada = '';
    this.precioGuarnicion = '';
    this.precioMontada = '';
    this.precioLimpiada = '';
  }


  registrarRegistro() {
    if (this.selectedTipo == null || this.rege_nombre == '') {
      return this.funcionesGenerales.showErrorViaToast("Registra todos los campos");
    }
    if (this.selectedTipo == 'MODELO') {
      return this.registroModelo();
    }
    this.registroGeneral();
  }



  registroGeneral() {
    try {
      this.RegistroGeneral.rege_nombre = this.rege_nombre.toUpperCase();
      this.RegistroGeneral.rege_tipo = this.selectedTipo;

      if (this.precioCortada == '') {
        this.precioCortada = '$0'
      }
      if (this.precioGuarnicion == '') {
        this.precioGuarnicion = '$0'
      }
      if (this.precioMontada == '') {
        this.precioMontada = '$0'
      }
      if (this.precioLimpiada == '') {
        this.precioLimpiada = '$0'
      }

      this.RegistroGeneral.prere_cortada = this.precioCortada;
      this.RegistroGeneral.prere_guarnicion = this.precioGuarnicion;
      this.RegistroGeneral.prere_montada = this.precioMontada;
      this.RegistroGeneral.prere_limpiada = this.precioLimpiada;

      this.RegistrosGeneralesService.registrar(this.RegistroGeneral).subscribe(res => {
        if (res['status']) {
          this.limpiarFormulario();

          if (this.selectedTipo == 'COLOR') {
            this.getColores();
          }

          if (this.selectedTipo == 'PLANTA') {
            this.getPlantas();
          }

          return this.funcionesGenerales.showSuccessViaToast(res['message']);
        } else {
          return this.funcionesGenerales.showErrorViaToast(res['message']);
        }
      });

    } catch (error) {
      return this.funcionesGenerales.showErrorViaToast("Selecciona todos los campos");
    }
  }

  registroModelo() {
    this.Modelo.mod_nombre = this.rege_nombre.toUpperCase();;
    this.Modelo.mod_planta_id = this.selectedPlanta.rege_id;
    this.Modelo.mod_referencia_id = this.selectedReferencia.rege_id;
    this.Modelo.mod_planta_nombre = this.selectedPlanta.rege_nombre;
    this.Modelo.mod_referencia_nombre = this.selectedReferencia.rege_nombre;

    this.Modelo.mod_materiales = this.MaterialesModelo;

    this.ModeloService.registrar(this.Modelo).subscribe(res => {
      if (res['status']) {
        this.limpiarFormulario();
        this.listarModelos();
        return this.funcionesGenerales.showSuccessViaToast(res['message']);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });
  }


  actualizarModelo() {
    this.Modelo.mod_nombre = this.rege_nombre.toUpperCase();;
    this.Modelo.mod_planta_id = this.selectedPlanta.rege_id;
    this.Modelo.mod_referencia_id = this.selectedReferencia.rege_id;
    this.Modelo.mod_planta_nombre = this.selectedPlanta.rege_nombre;
    this.Modelo.mod_referencia_nombre = this.selectedReferencia.rege_nombre;

    this.Modelo.mod_materiales = this.MaterialesModelo;

    this.ModeloService.actualizar(this.Modelo).subscribe(res => {
      if (res['status']) {
        this.limpiarFormulario();
        this.listarModelos();
        return this.funcionesGenerales.showSuccessViaToast(res['message']);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });
  }

  limpiarFormulario() {
    this.display = false;
    this.viwer = false;
    this.selectedColor = undefined;
    this.selectedPlanta = undefined;
    this.selectedReferencia = undefined;
    this.selectedTipoMaterial = undefined;
    this.selectedMaterial = undefined;
    this.cantidad = ''
    this.RegistroGeneral = new RegistroGeneral();
    this.Material = new Material();
    this.rege_nombre = '';
    this.precioCortada = '';
    this.precioGuarnicion = '';
    this.precioMontada = '';
    this.precioLimpiada = '';
    this.MaterialesModelo = [];
  }


  iniciarActualizacion(rowData) {
    this.RegistroGeneral = rowData;
    this.rege_nombre = rowData.rege_nombre;

    if (this.selectedTipo == 'REFERENCIA') {
      this.rege_nombre = rowData.prere_referencia_nombre;
      this.precioCortada = rowData.prere_precio_cortada
      this.precioGuarnicion = rowData.prere_precio_guarnicion
      this.precioMontada = rowData.prere_precio_montada
      this.precioLimpiada = rowData.prere_precio_limpiada
    }

    if (this.selectedTipo == 'MODELO') {
      this.Modelo = rowData;
      this.selectedReferencia = this.referencias.filter(c => c.rege_nombre == rowData.mod_referencia_nombre)[0];
      this.selectedPlanta = this.plantas.filter(c => c.rege_nombre == rowData.mod_planta_nombre)[0];
      this.getMaterialesModelo(rowData.mod_id);
      this.rege_nombre = rowData.mod_nombre;
    }

    this.viwer = false;
    this.title = "EDITAR";
    this.display = true;
  }

  actualizarRegistro() {
    if (this.selectedTipo == 'MODELO') {
      return this.actualizarModelo();
    }
    if (this.rege_nombre == '') {
      return this.funcionesGenerales.showErrorViaToast("Registra todos los campos");
    }

    this.RegistroGeneral.rege_tipo = this.selectedTipo;
    this.RegistroGeneral.rege_nombre = this.rege_nombre.toUpperCase();

    if (this.selectedTipo == 'REFERENCIA') {
      this.RegistroGeneral.rege_id = this.RegistroGeneral['prere_referencia']
      this.RegistroGeneral.prere_cortada = this.precioCortada;
      this.RegistroGeneral.prere_guarnicion = this.precioGuarnicion;
      this.RegistroGeneral.prere_montada = this.precioMontada;
      this.RegistroGeneral.prere_limpiada = this.precioLimpiada;
    }
    this.RegistrosGeneralesService.actualizar(this.RegistroGeneral).subscribe(res => {
      if (res['status']) {
        if (this.selectedTipo == 'REFERENCIA') {
          this.getReferencias();
        }
        this.limpiarFormulario();
        return this.funcionesGenerales.showSuccessViaToast(res['message']);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });
  }

  validarSeleccion() {
    this.regReferencia = false;
    this.regModelo = false;
    this.regColor = false;
    this.regPlanta = false;
    this.validarReferencia();
    this.validarModelo();
    this.validarColor();
    this.validarPlanta();
  }

  validarReferencia() {
    if (this.selectedTipo == 'REFERENCIA') {
      this.regReferencia = true;
      this.getReferencias();
      this.registrosGenerales = this.referencias;

      this.cols = [
        { field: 'prere_referencia_nombre', header: 'Referencia', class: '' },
        { field: 'prere_precio_cortada', header: 'Cortada', class: '' },
        { field: 'prere_precio_guarnicion', header: 'Guarnición', class: '' },
        { field: 'prere_precio_montada', header: 'Montada', class: '' },
        { field: 'prere_precio_limpiada', header: 'Limpiada', class: '' },
        { field: 'actualizar', header: 'Actualizar', class: 'thIcons' }
      ];
    }
  }


  validarModelo() {
    if (this.selectedTipo == 'MODELO') {
      this.regModelo = true;
      this.cargarTabla();
      this.listarModelos();
      this.getReferencias();
      this.getPlantas();
    }
  }

  validarColor() {
    if (this.selectedTipo == 'COLOR') {
      this.regColor = true;
      this.getColores();

      this.cols = [
        { field: 'rege_nombre', header: 'Nombre', class: '' },
        { field: 'rege_fecha_registro', header: 'Fecha c.', class: '' },
        { field: 'actualizar', header: 'Actualizar', class: 'thIcons' }
      ];
    }
  }

  validarPlanta() {
    if (this.selectedTipo == 'PLANTA') {
      this.regPlanta = true;
      this.getPlantas();

      this.cols = [
        { field: 'rege_nombre', header: 'Nombre', class: '' },
        { field: 'rege_fecha_registro', header: 'Fecha c.', class: '' },
        { field: 'actualizar', header: 'Actualizar', class: 'thIcons' }
      ];
    }
  }

  agregarMaterial() {
    if (this.selectedMaterial != undefined && this.cantidad != '') {
      var data = this.MaterialesModelo.filter(c => c.nombre == this.selectedMaterial.descripcion)
      if (data.length > 0) {
        this.funcionesGenerales.showErrorViaToast("Este material ya fue agregado")
        return;
      }

      this.MaterialesModelo.push({
        nombre: this.selectedMaterial.descripcion,
        tipo: this.selectedTipoMaterial,
        cantidad: ((parseFloat(this.cantidad.replace(' Metros', '')) / 12).toFixed(2)) + ' Metros',
        id: this.selectedMaterial.mat_id
      })
      this.MaterialesModelo = this.MaterialesModelo.filter(c => c);

      this.selectedMaterial = undefined;
      this.cantidad = '';

    } else {
      this.funcionesGenerales.showErrorViaToast("Seleccione todos los campos")
    }
  }

  eliminarMaterial(material) {
    this.MaterialesModelo = this.MaterialesModelo.filter(c => c.id != material.id);
  }

  getColores() {
    this.RegistrosGeneralesService.listarByTipo('COLOR').subscribe(res => {
      this.colores = res['data'] as [];
      this.colores.sort((a, b) => {
        if (a.rege_nombre > b.rege_nombre) return 1;
        if (a.rege_nombre < b.rege_nombre) return -1;
        return 0;
      });
      if (this.selectedTipo == 'COLOR') {
        this.registrosGenerales = this.colores;
      }
    });
  }

  getReferencias() {
    this.RegistrosGeneralesService.listarByTipo('REFERENCIA').subscribe(res => {
      this.referencias = res['data'] as [];
      this.referencias.sort((a, b) => {
        if (a.rege_nombre > b.rege_nombre) return 1;
        if (a.rege_nombre < b.rege_nombre) return -1;
        return 0;
      });
      if (this.selectedTipo == 'REFERENCIA') {
        this.getPreciosReferencias();
      }
    });
  }

  getPreciosReferencias() {
    this.RegistrosGeneralesService.listarPreciosReferencias().subscribe(res => {
      this.preciosReferencias = res['data'] as [];
      for (let i = 0; i < this.preciosReferencias.length; i++) {
        this.preciosReferencias[i]['prere_referencia_nombre'] = this.referencias.filter(c => c.rege_id == this.preciosReferencias[i]['prere_referencia'])[0]['rege_nombre']
      }
      this.registrosGenerales = this.preciosReferencias;
    });
  }

  getPlantas() {
    this.RegistrosGeneralesService.listarByTipo('PLANTA').subscribe(res => {
      this.plantas = res['data'] as [];
      this.plantas.sort((a, b) => {
        if (a.rege_nombre > b.rege_nombre) return 1;
        if (a.rege_nombre < b.rege_nombre) return -1;
        return 0;
      });
      if (this.selectedTipo == 'PLANTA') {
        this.registrosGenerales = this.plantas;
      }
    });
  }

  getMateriales() {
    this.materiales = [];
    this.MaterialService.listarByTipo(this.selectedTipoMaterial).subscribe(res => {
      this.materiales = res['data'] as [];
      for (let i = 0; i < this.materiales.length; i++) {
        this.materiales[i]['descripcion'] = this.materiales[i]['mat_nombre'] + ' - ' + this.materiales[i]['mat_color']
      }
      this.materiales.sort((a, b) => {
        if (a.mat_nombre > b.mat_nombre) return 1;
        if (a.mat_nombre < b.mat_nombre) return -1;
        return 0;
      });
    });
  }

  getMaterialesModelo(matmo_modelo) {
    this.ModeloService.listarAllMaterialModelo(matmo_modelo).subscribe(res => {
      if (res['status']) {
        var materiales = [];
        materiales = res['data'] as [];
        for (let i = 0; i < materiales.length; i++) {
          this.MaterialesModelo.push({
            nombre: materiales[i].matmo_material.nombre,
            tipo: materiales[i].matmo_tipo,
            cantidad: materiales[i].matmo_cantidad,
            id: materiales[i].matmo_material.id
          });
          this.MaterialesModelo = this.MaterialesModelo.filter(c => c);
        }
      }
    });
  }

  formatearMoneda() {
    this.precioCortada = this.funcionesGenerales.formatoMonedaText(this.precioCortada);
    this.precioGuarnicion = this.funcionesGenerales.formatoMonedaText(this.precioGuarnicion);
    this.precioMontada = this.funcionesGenerales.formatoMonedaText(this.precioMontada);
    this.precioLimpiada = this.funcionesGenerales.formatoMonedaText(this.precioLimpiada);
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

  seleccionarTipo(tipo) {
    this.selectedTipo = tipo;
    this.validarSeleccion();
  }

  formatearCantidadMetros() {
    this.cantidad = this.funcionesGenerales.formatoCantidadMetrosText(this.cantidad)
  }

}
