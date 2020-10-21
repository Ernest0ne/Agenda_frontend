import { Component, OnInit } from '@angular/core';
import { RegistrosGeneralesService } from '../../../Services/registros-generales.service';
import { RegistroGeneral } from '../../../models/registroGeneral';
import { MaterialService } from '../../../Services/material.service';
import { Material } from '../../../models/material';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService, MenuItem } from 'primeng/api';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
import * as SecureLS from 'secure-ls';
import { flatMap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-save-materiales',
  templateUrl: './save-materiales.component.html',
  styleUrls: ['./save-materiales.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SaveMaterialesComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private service: MessageService,
    public funcionesGenerales: FuncionesGenerales,
    public RegistrosGeneralesService: RegistrosGeneralesService,
    public MaterialService: MaterialService,
  ) { }

  display: boolean;
  viwer: boolean;
  nuevoMaterial: boolean;
  nuevoColor: boolean;
  regMetros: boolean;
  regColor: boolean;

  title = '';

  materiales = []
  colores = []
  cols = [];
  tipoMaterial = [];
  nombreMateriales = [];
  nombreColores = [];

  public RegistroGeneral: RegistroGeneral;

  public Material: Material
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;

  filterColor = ''
  filterTipoMaterial = ''

  selectedTipoMaterial;
  cantidad = '';
  rege_nombre = '';
  selectedColor = '';


  ngOnInit() {
    this.validar_permisos();
    this.cargarTabla();
    this.RegistroGeneral = new RegistroGeneral();
    this.Material = new Material();
  }


  validar_permisos() {
    const permisos = this.ls.get('Materiales');
    if (permisos != null) {
      const permiso = permisos.split('-');
      for (let i = 0; i < permiso.length; i++) {
        if (permiso[i] == 'Materiales') {

        }
      }
    } else {
      location.href = '/#/Shoes/accessDenied';
    }
  }


  cargarTabla() {
    this.cols = [
      { field: 'mat_nombre', header: 'Nombre', class: '' },
      { field: 'mat_color', header: 'Color', class: '' },
      { field: 'mat_tipo', header: 'Tipo', class: '' },
      { field: 'mat_cantidad', header: 'Cantidad', class: '' },
      { field: 'actualizar', header: 'Actualizar', class: 'thIcons' }
    ];

    this.tipoMaterial = [
      { label: 'CORDÓN', value: 'CORDÓN' },
      { label: 'HILO', value: 'HILO' },
      { label: 'TELA', value: 'TELA' },
      { label: 'PEGANTE', value: 'PEGANTE' },
    ]

    this.listarMateriales();
    this.getColores();
  }


  listarMateriales() {
    this.MaterialService.listar().subscribe(res => {
      this.materiales = res['data'] as [];
      this.materiales.sort((a, b) => {
        if (a.mat_nombre > b.mat_nombre) return 1;
        if (a.mat_nombre < b.mat_nombre) return -1;
        return 0;
      });
      this.totalRegistros = this.materiales.length;
    });
  }

  getColores() {
    this.RegistrosGeneralesService.listarByTipo('COLOR').subscribe(res => {
      this.colores = res['data'] as [];
      this.colores.sort((a, b) => {
        if (a.rege_nombre > b.rege_nombre) return 1;
        if (a.rege_nombre < b.rege_nombre) return -1;
        return 0;
      });

      this.nombreColores = [{ label: 'CREAR OTRO', value: 'CREAR OTRO' }];
      var nombres = this.funcionesGenerales.eliminarDuplicados(this.colores.map(c => c.rege_nombre));
      for (let i = 0; i < nombres.length; i++) {
        this.nombreColores.push({ label: nombres[i], value: nombres[i] })
      }
    });
  }

  iniciarRegistro() {
    this.viwer = false;
    this.display = !this.display;
    this.title = 'REGISTRAR'
    this.Material = new Material();
    this.nuevoMaterial = false;
    this.nuevoColor = false;
  }

  limpiarFormulario() {
    this.display = false;
    this.viwer = false;
    this.Material = new Material();
    this.selectedColor = '';
    this.rege_nombre = '';
    this.cantidad = '';
    this.selectedTipoMaterial = undefined;
    this.nuevoColor = false;
    this.nuevoMaterial = false;
  }


  iniciarActualizacion(rowData) {
    this.selectedTipoMaterial = rowData.mat_tipo;
    this.listarNombresMateriales();
    this.Material = rowData;
    this.selectedColor = rowData.mat_color;
    this.rege_nombre = rowData.mat_nombre;
    this.cantidad = rowData.mat_cantidad;
    this.viwer = false;
    this.title = "EDITAR";
    this.display = true;
  }

  actuaizarMaterial() {
    if (this.cantidad == '' || this.rege_nombre == '' || this.selectedTipoMaterial == undefined) {
      return this.funcionesGenerales.showErrorViaToast('Registra todos los campos')
    }

    if (this.regColor && this.selectedColor == '') {
      return this.funcionesGenerales.showErrorViaToast('Registra todos los campos')
    }

    this.Material.mat_cantidad = this.cantidad;
    this.Material.mat_color = this.selectedColor.toUpperCase();;
    this.Material.mat_nombre = this.rege_nombre.toUpperCase();
    this.Material.mat_tipo = this.selectedTipoMaterial;

    if (this.nuevoColor) {
      this.registrarColor();
    }
    this.MaterialService.actualizar(this.Material).subscribe(res => {
      if (res['status']) {
        this.listarMateriales();
        this.limpiarFormulario();
        return this.funcionesGenerales.showSuccessViaToast(res['message']);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });

  }

  registrarMaterial() {
    if (this.cantidad == '' || this.rege_nombre == '' || this.selectedTipoMaterial == undefined) {
      return this.funcionesGenerales.showErrorViaToast('Registra todos los campos')
    }

    if (this.regColor && this.selectedColor == '') {
      return this.funcionesGenerales.showErrorViaToast('Registra todos los campos')
    }

    this.Material.mat_cantidad = this.cantidad;
    this.Material.mat_color = this.selectedColor.toUpperCase();;
    this.Material.mat_nombre = this.rege_nombre.toUpperCase();
    this.Material.mat_tipo = this.selectedTipoMaterial;

    if (this.nuevoColor) {
      this.registrarColor();
    }

    this.MaterialService.registrar(this.Material).subscribe(res => {
      if (res['status']) {
        this.listarMateriales();
        this.limpiarFormulario();
        return this.funcionesGenerales.showSuccessViaToast(res['message']);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });

  }


  registrarColor() {
    this.RegistroGeneral.rege_tipo = 'COLOR';
    this.RegistroGeneral.rege_nombre = this.selectedColor.toUpperCase();
    this.RegistrosGeneralesService.registrar(this.RegistroGeneral).subscribe(res => {
      if (res['status']) {
        this.getColores();
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });
  }


  formatearCantidadMetros() {
    this.cantidad = this.funcionesGenerales.formatoCantidadMetrosText(this.cantidad)
  }

  formatearCantidadUnidades() {
    this.cantidad = this.funcionesGenerales.formatoCantidadUnidadesText(this.cantidad)
  }


  listarNombresMateriales() {
    this.rege_nombre = '';
    this.cantidad = '';
    this.selectedColor = '';
    this.nombreMateriales = [{ label: 'CREAR OTRO', value: 'CREAR OTRO' }];
    var materiales = this.materiales.filter(c => c.mat_tipo == this.selectedTipoMaterial);
    var nombres = this.funcionesGenerales.eliminarDuplicados(materiales.map(c => c.mat_nombre));
    for (let i = 0; i < nombres.length; i++) {
      this.nombreMateriales.push({ label: nombres[i], value: nombres[i] })
    }

    if (nombres.length == 0) {
      this.nuevoMaterial = true;
    } else {
      this.nuevoMaterial = false;
    }

    if (this.selectedTipoMaterial == 'TELA') {
      this.regMetros = true;
    } else {
      this.regMetros = false;
    }

    if (this.selectedTipoMaterial == 'PEGANTE') {
      this.regColor = false;
    } else {
      this.regColor = true;
    }

  }

  seleccionarNombreMaterial() {
    if (this.rege_nombre == 'CREAR OTRO') {
      this.nuevoMaterial = true;
      this.rege_nombre = ''
    }
  }

  cancelarNuevoNombreMaterial() {
    this.nuevoMaterial = false;
    this.rege_nombre = '';
  }

  seleccionarNombreColor() {
    if (this.selectedColor == 'CREAR OTRO') {
      this.nuevoColor = true;
      this.selectedColor = ''
    }
  }

  cancelarNuevoNombreColor() {
    this.nuevoColor = false;
    this.selectedColor = '';
  }



}
