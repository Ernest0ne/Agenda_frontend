import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { ConfigTables } from 'src/app/demo/utilities/config-tables.service';
import { UtilitiesConfigString } from 'src/app/demo/utilities/utilities-config-string.service';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css'],
  providers: [ConfirmationService, MessageService, ConfigTables]
})
export class ProfesoresComponent implements OnInit {

  form: FormGroup;
  profesores = []
  cols = [];
  public Cliente: any
  ls = new SecureLS({ encodingType: 'aes' });
  totalRegistros = 0;

  constructor(
    public configTables: ConfigTables,
    private confirmationService: ConfirmationService,
    private service: MessageService,
    private formBuilder: FormBuilder,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    private utilitiesString: UtilitiesConfigString
  ) { }

  ngOnInit() {
    this.app.mostarMenu();
    this.cargarFormulario()
    this.cargarTabla()
  }


  cargarFormulario() {
    this.form = new FormGroup({
      pro_nombre: new FormControl({ value: null, disabled: false }, [Validators.required]),
      pro_apellido: new FormControl({ value: null, disabled: false }, [Validators.required]),
      pro_correo: new FormControl({ value: null, disabled: false }, [Validators.required]),
      pro_facultad: new FormControl({ value: null, disabled: false }, [Validators.required]),
      pro_departamento: new FormControl({ value: null, disabled: false }, [Validators.required]),
    });
  }

  cargarTabla() {
    this.cols = [
      { field: 'pro_nombre', header: 'Nombre' },
      { field: 'pro_apellido', header: 'Apellido' },
      { field: 'pro_correo', header: 'Correo' },
      { field: 'actions', header: 'Acciones' },
    ];
  }

}
