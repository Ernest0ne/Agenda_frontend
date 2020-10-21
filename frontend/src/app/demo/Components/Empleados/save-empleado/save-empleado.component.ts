import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { EmpleadosService } from '../../../Services/empleados.service';
import { Empleado } from '../../../models/empleado';

@Component({
  selector: 'app-save-empleado',
  templateUrl: './save-empleado.component.html',
  styleUrls: ['./save-empleado.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SaveEmpleadoComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private service: MessageService,
    private formBuilder: FormBuilder,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    public EmpleadosService: EmpleadosService
  ) { }



  display: boolean;
  viwer: boolean;

  title = '';

  empleados = [];
  cols = [];

  areas = [];
  selectedArea;
  placeholderArea = 'Seleccionar';

  public Empleado: Empleado

  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;


  ngOnInit() {
    this.validar_permisos();
    this.cargarTabla();
    this.getEmpleados();
    this.Empleado = new Empleado();
  }


  validar_permisos() {
    const permisos = this.ls.get('Empleados');
    if (permisos != null) {
      const permiso = permisos.split('-');
      for (let i = 0; i < permiso.length; i++) {
        if (permiso[i] == 'Empleados') {
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
      { field: 'emp_nombre', header: 'Nombre', class: '' },
      { field: 'emp_celular', header: 'Celular', class: '' },
      { field: 'emp_direccion', header: 'Dirección', class: '' },
      { field: 'emp_area', header: 'Area', class: '' },
      { field: 'emp_fecha_creacion', header: 'Fecha c.', class: 'thIcons' },
      { field: 'visualizar', header: 'Visualizar', class: 'thIcons' },
      { field: 'actualizar', header: 'Actualizar', class: 'thIcons' },
      { field: 'eliminar', header: 'Eliminar', class: 'thIcons' }
    ];
  }

  getEmpleados() {
    this.EmpleadosService.listar().subscribe(res => {
      if (res['status']) {
        this.empleados = res['data'] as [];
        this.empleados = this.empleados.filter(c => c.emp_estado == 'ACTIVO')
        this.empleados.sort((a, b) => {
          if (a.emp_nombre > b.emp_nombre) return 1;
          if (a.emp_nombre < b.emp_nombre) return -1;
          return 0;
        });
        this.totalRegistros = this.empleados.length;
      }
    });
  }

  iniciarRegistro() {
    this.placeholderArea = 'Seleccionar';
    this.viwer = false;
    this.display = !this.display;
    this.title = 'REGISTRAR'
    this.Empleado = new Empleado();
  }

  registrarEmpleado() {

    if (this.selectedArea == null || this.Empleado.emp_nombre == '' || this.Empleado.emp_celular == '' || this.Empleado.emp_direccion == '') {
      return this.funcionesGenerales.showErrorViaToast("Registra todos los campos");
    }

    this.Empleado.emp_nombre = this.Empleado.emp_nombre.toUpperCase();
    this.Empleado.emp_celular = this.Empleado.emp_celular.toUpperCase();
    this.Empleado.emp_direccion = this.Empleado.emp_direccion.toUpperCase();
    try {
      this.Empleado.emp_area = this.selectedArea;
      this.EmpleadosService.registrar(this.Empleado).subscribe(res => {
        if (res['status']) {
          this.limpiarFormulario();
          return this.funcionesGenerales.showSuccessViaToast(res['message']);
        } else {
          return this.funcionesGenerales.showErrorViaToast(res['message']);
        }
      });
    } catch (error) {
      return this.funcionesGenerales.showErrorViaToast("Selecciona todos los campos");
    }
  }


  limpiarFormulario() {
    this.display = false;
    this.viwer = false;
    this.Empleado = new Empleado();
    this.selectedArea = null;
    this.getEmpleados();
  }


  verEmpleado(rowData) {
    this.Empleado  = rowData;
    this.placeholderArea = rowData.emp_area;
    this.title = "VISUALIZAR";
    this.display = true;
    this.viwer = true;
  }



  iniciarActualizacion(rowData) {
    this.Empleado = rowData;
    this.placeholderArea = rowData.emp_area
    this.viwer = false;
    this.title = "EDITAR";
    this.display = true;
    this.selectedArea = null;
  }


  actualizarEmpleado() {

    if (this.Empleado.emp_nombre == '' || this.Empleado.emp_celular == '' || this.Empleado.emp_direccion == '') {
      return this.funcionesGenerales.showErrorViaToast("Registra todos los campos");
    }
    if (this.selectedArea != null) {
      this.Empleado.emp_area = this.selectedArea;
    }
    this.Empleado.emp_nombre = this.Empleado.emp_nombre.toUpperCase();
    this.Empleado.emp_celular = this.Empleado.emp_celular.toUpperCase();
    this.Empleado.emp_direccion = this.Empleado.emp_direccion.toUpperCase();

    this.EmpleadosService.actualizar(this.Empleado).subscribe(res => {
      if (res['status']) {
        this.limpiarFormulario();
        return this.funcionesGenerales.showSuccessViaToast(res['message']);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });
  }



  eliminarEmpleado(rowData) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el Empleado: ' + rowData.emp_nombre + '?',
      accept: () => {

        var body = {
          emp_estado: 'ANULADO',
          emp_id: rowData.emp_id
        }
        this.EmpleadosService.actualizarEstado(body).subscribe(res => {
          if (res['status']) {
            this.limpiarFormulario();
            return this.funcionesGenerales.showSuccessViaToast(res['message']);
          } else {
            return this.funcionesGenerales.showErrorViaToast(res['message']);
          }
        });
      }
    });
  }

}
