import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { ClienteService } from '../../../Services/cliente.service';
import { Cliente } from '../../../models/cliente';


@Component({
  selector: 'app-save-cliente',
  templateUrl: './save-cliente.component.html',
  styleUrls: ['./save-cliente.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SaveClienteComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private service: MessageService,
    private formBuilder: FormBuilder,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    public ClienteService: ClienteService
  ) { }



  display: boolean;
  viwer: boolean;

  title = '';

  clientes = []
  cols = [];

  public Cliente: Cliente

  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;


  ngOnInit() {
    this.validar_permisos();
    this.cargarTabla();
    this.getClientes();
    this.Cliente = new Cliente();
  }


  validar_permisos() {
    const permisos = this.ls.get('GestiondeClientes');
    if (permisos != null) {
      const permiso = permisos.split('-');
      for (let i = 0; i < permiso.length; i++) {
        if (permiso[i] == 'Gestionde Clientes') {

        }
      }
    } else {
      location.href = '/#/Shoes/accessDenied';
    }
  }

  cargarTabla() {
    this.cols = [
      { field: 'cli_nombre', header: 'Nombre', class: '' },
      { field: 'cli_celular', header: 'Celular', class: '' },
      { field: 'cli_direccion', header: 'Dirección', class: '' },
      { field: 'cli_fecha_creacion', header: 'Fecha c.', class: 'thIcons' },
      { field: 'visualizar', header: 'Visualizar', class: 'thIcons' },
      { field: 'actualizar', header: 'Actualizar', class: 'thIcons' },
      { field: 'eliminar', header: 'Eliminar', class: 'thIcons' }
    ];
  }


  getClientes() {
    this.ClienteService.listar().subscribe(res => {
      this.clientes = res['data'] as [];
      this.clientes = this.clientes.filter(c => c.cli_estado == 'ACTIVO')
      this.clientes.sort((a, b) => {
        if (a.cli_nombre > b.cli_nombre) return 1;
        if (a.cli_nombre < b.cli_nombre) return -1;
        return 0;
      });

      this.totalRegistros = this.clientes.length;
    });
  }


  iniciarRegistro() {
    this.viwer = false;
    this.display = !this.display;
    this.title = 'REGISTRAR'
    this.Cliente = new Cliente();
  }

  limpiarFormulario() {
    this.display = false;
    this.viwer = false;
    this.Cliente = new Cliente();
    this.getClientes();
  }


  registrarCliente() {

    if (this.Cliente.cli_direccion == '' || this.Cliente.cli_nombre == '' || this.Cliente.cli_celular == '') {
      return this.funcionesGenerales.showErrorViaToast("Registra todos los campos");
    }

    try {

      this.Cliente.cli_direccion = this.Cliente.cli_direccion.toUpperCase();
      this.Cliente.cli_nombre = this.Cliente.cli_nombre.toUpperCase();

      this.ClienteService.registrar(this.Cliente).subscribe(res => {
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



  iniciarActualizacion(rowData) {
    this.Cliente = rowData;
    this.viwer = false;
    this.title = "EDITAR";
    this.display = true;
  }


  actualizarCliente() {
    if (this.Cliente.cli_direccion == '' || this.Cliente.cli_nombre == '' || this.Cliente.cli_celular == '') {
      return this.funcionesGenerales.showErrorViaToast("Registra todos los campos");
    }
    this.Cliente.cli_direccion = this.Cliente.cli_direccion.toUpperCase();
    this.Cliente.cli_nombre = this.Cliente.cli_nombre.toUpperCase();

    this.ClienteService.actualizar(this.Cliente).subscribe(res => {
      if (res['status']) {
        this.limpiarFormulario();
        return this.funcionesGenerales.showSuccessViaToast(res['message']);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });
  }


  verCliente(rowData) {
    this.Cliente = rowData;
    this.title = "VISUALIZAR";
    this.display = true;
    this.viwer = true;
  }


  eliminarCliente(rowData) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el Cliente: ' + rowData.cli_nombre + '?',
      accept: () => {

        var body = {
          cli_estado: 'INACTIVO',
          cli_id: rowData.cli_id
        }
        this.ClienteService.actualizarEstado(body).subscribe(res => {
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
