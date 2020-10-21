import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { Tiquete } from '../../../models/tiquete';
import { TiqueteService } from '../../../Services/tiquete.service';
import { RegistrosGeneralesService } from '../../../Services/registros-generales.service';
import { ClienteService } from '../../../Services/cliente.service';
import { ModeloService } from '../../../Services/modelo.service';
import { MaterialService } from '../../../Services/material.service';
import { empty } from 'rxjs';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
import html2canvas from 'html2canvas';
import * as svg from 'save-svg-as-png';




@Component({
    selector: 'app-save-tiquete',
    templateUrl: './save-tiquete.component.html',
    styleUrls: ['./save-tiquete.component.css'],
    providers: [ConfirmationService, MessageService]
})
export class SaveTiqueteComponent implements OnInit {
    constructor(
        private confirmationService: ConfirmationService,
        private service: MessageService,
        private formBuilder: FormBuilder,
        public funcionesGenerales: FuncionesGenerales,
        private app: AppComponent,
        public TiqueteService: TiqueteService,
        public RegistrosGeneralesService: RegistrosGeneralesService,
        public ClienteService: ClienteService,
        public ModeloService: ModeloService,
        public MaterialService: MaterialService
    ) { }


    display: boolean;
    viwer: boolean;
    registro: boolean;

    title = '';

    cols = [];

    ls = new SecureLS({ encodingType: 'aes' });
    totalRegistros = 0;


    filterCodigo = '';
    filterReferencia = '';
    filterMaterial = '';
    filterColor = '';
    filterPares = '';

    public Tiquete: Tiquete;

    //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::..

    tiquetes: Tiquete[];
    colores = [];
    referencias = [];
    plantas = [];
    materiales = [];
    clientes = [];
    totalPares = 0;
    pares = [];

    modelos = [];

    tiq_observacion = '';
    selectedPlanta;
    selectedColor;
    selectedReferencia;
    selectedCliente;

    selectedModelo;
    MaterialesModelo = [];

    multiplicador: any


    elementType = 'svg';
    value = 'someValue12340987';
    format = 'CODE128';
    lineColor = '#000000';
    width = 2;
    height = 50;
    displayValue = true;
    fontOptions = '';
    font = 'monospace';
    textAlign = 'center';
    textPosition = 'bottom';
    textMargin = 2;
    fontSize = 20;
    background = '#ffffff';
    margin = 10;
    marginTop = 10;
    marginBottom = 10;
    marginLeft = 10;
    marginRight = 10;





    ngOnInit() {


        this.validar_permisos();

        this.cargarTabla();
        this.getColores();
        this.getReferencias();
        this.getPlantas();
        this.getClientes();

        this.getModelos();
        this.getTiquetes();

        this.Tiquete = new Tiquete();
        this.pares = new Array(30);

        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::..
    }

    validar_permisos() {
        const permisos = this.ls.get('GestiondeTickets');
        if (permisos != null) {
            const permiso = permisos.split('-');
            for (let i = 0; i < permiso.length; i++) {
                if (permiso[i] == 'Gestion de Tickets') {
                }
            }
        } else {
            location.href = '/#/Shoes/accessDenied';
        }
    }


    getModelos() {
        this.ModeloService.listar().subscribe(res => {
            this.modelos = res['data'] as [];
            this.modelos.sort((a, b) => {
                if (a.mod_nombre > b.mod_nombre) return 1;
                if (a.mod_nombre < b.mod_nombre) return -1;
                return 0;
            });
        });
    }

    cargarInformacionModelo() {
        this.selectedPlanta = this.selectedModelo.mod_planta.nombre;
        this.selectedReferencia = this.selectedModelo.mod_referencia.nombre;
        this.getMaterialesModelo(this.selectedModelo.mod_id);
    }

    getMaterialesModelo(matmo_modelo) {
        this.MaterialesModelo = [];
        this.ModeloService.listarAllMaterialModelo(matmo_modelo).subscribe(res => {
            if (res['status']) {
                var materiales = [];
                materiales = res['data'] as [];

                // esta funcion obtenerMaterialesModelo devolvera una promesa cuando se halla ejecutado
                this.obtenerMaterialesModelo(materiales).then(value => {
                    this.calcularCantidadTotalMaterial();
                });
            }
        });
    }


    obtenerMaterialesModelo(materiales) {
        var contador = 0
        return new Promise(resolve => {
            for (let i = 0; i < materiales.length; i++) {
                // la funcion getMaterial devolvera un callback cada ves que se ejecute, cada ves que  devuelva el callback se pregunta si
                // el numero de veces ejecutada es igual al length del for, de ser asi, el for ya termino y se devolvera la promesa
                // el callback podria retornar algun valor, si fuera asi seria:  this.getMaterial(materiales[i], function(value)... este valor se puede usar en la logica siguiente
                this.getMaterial(materiales[i], function () {
                    if (++contador === materiales.length) {
                        resolve(true);
                    }
                });
            }
        });
    }

    getMaterial(materialModelo, callback) {
        this.MaterialService.listarById(materialModelo.matmo_material.id).subscribe(res => {
            if (res['status']) {
                var material = [];
                material = res['data'] as [];
                this.MaterialesModelo.push({
                    nombre: materialModelo.matmo_material.nombre,
                    tipo: materialModelo.matmo_tipo,
                    cantidad: materialModelo.matmo_cantidad.replace('Metros', 'mts'),
                    cantidadTotal: 0,
                    id: materialModelo.matmo_material.id,
                    restante: material[0]['mat_cantidad'].replace('Metros', 'mts'),
                    restante_real: material[0]['mat_cantidad'].replace('Metros', 'mts')
                });
                this.MaterialesModelo = this.MaterialesModelo.filter(c => c);
                var restanteMaterial = parseFloat(material[0]['mat_cantidad'].replace(' Metros', ''));
                if (restanteMaterial <= 0) {
                    this.funcionesGenerales.showErrorViaToast('Material agotado, no puede continuar creando este Ticket');
                }
                // se retorna el callback de esta funcion, en este caso el callback no envia ningun parametro, pero si podria enviarlo: callback(value)
                callback();
            } else {
                this.funcionesGenerales.showErrorViaToast('Ocurrio un error buscando este material: ' + materialModelo.matmo_material.nombre);
                return 0;
            }
        })
    }


    cargarTabla() {
        this.cols = [
            { field: 'tiq_codigo', header: 'Código', class: '' },
            { field: 'tiq_cliente_nombre', header: 'Cliente', class: '' },
            { field: 'tiq_color', header: 'Modelo', class: '' },
            { field: 'tiq_planta', header: 'Planta', class: '' },
            { field: 'tiq_pares', header: 'Pares', class: '' },
            { field: 'visualizar', header: 'Visualizar', class: 'thIcons' },
            { field: 'actualizar', header: 'Actualizar', class: 'thIcons' }
        ];
    }



    getTiquetes() {
        this.TiqueteService.listar().subscribe(res => {
            this.tiquetes = res['data'] as [];
            this.tiquetes.sort((a, b) => {
                if (a.tiq_codigo < b.tiq_codigo) return 1;
                if (a.tiq_codigo > b.tiq_codigo) return -1;
                return 0;
            });

            for (let i = 0; i < this.tiquetes.length; i++) {
                this.tiquetes[i]['tiq_cliente_nombre'] = this.tiquetes[i]['tiq_cliente']['nombre']
                this.tiquetes = this.tiquetes.filter(c => c);
            }

            this.totalRegistros = this.tiquetes.length;
        });
    }


    eliminarTiquete(rowData) {
        this.confirmationService.confirm({
            message: '¿Está seguro que desea eliminar' + rowData.tiq_codigo + '?',
            accept: () => {
                var body = {
                    tiq_estado: 'ANULADO',
                    tiq_id: rowData.tiq_id
                }
                this.TiqueteService.actualizarEstado(body).subscribe(res => {
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


    iniciarActualizacion(rowData) {
        this.title = "EDITAR";
        this.Tiquete = rowData;
        this.verTiquete(rowData);
        this.viwer = false;
        this.display = true;
    }


    actualizarTiquete() {
        if (this.totalPares == 0) {
            return this.funcionesGenerales.showErrorViaToast("Selecciona pares");
        } else {
            var tallas = {
                tallas: this.pares
            }
            try {
                this.Tiquete.tiq_observaciones = this.tiq_observacion.toUpperCase();
                this.Tiquete.tiq_planta = this.selectedPlanta;
                this.Tiquete.tiq_material = JSON.stringify(this.MaterialesModelo);
                this.Tiquete.tiq_color = this.selectedModelo.mod_nombre;
                this.Tiquete.tiq_referencia = this.selectedModelo.mod_referencia;
                this.Tiquete.tiq_cliente_id = this.selectedCliente.cli_id;
                this.Tiquete.tiq_cliente_nombre = this.selectedCliente.cli_nombre;
                this.Tiquete.tiq_tallas = JSON.stringify(tallas);
                this.Tiquete.tiq_pares = '' + this.totalPares;
                this.Tiquete.tiq_estado = 'GENERADO';

                this.TiqueteService.actualizar(this.Tiquete).subscribe(res => {
                    if (res['status']) {
                        this.getTiquetes();
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
    }


    verTiquete(rowData) {
        this.Tiquete = rowData;
        var pares = JSON.parse(rowData.tiq_tallas)['tallas'];

        if (this.title != 'EDITAR') {
            for (var i = 0; i - pares.length; i++) {
                if (pares[i] == null) {
                    pares[i] = 'a';
                }
            }
            pares = pares.toString();
            this.pares = pares.split(',');
        } else {
            this.pares = pares;
        }

        this.totalPares = rowData.tiq_pares;
        this.tiq_observacion = rowData.tiq_observaciones;
        this.selectedCliente = this.clientes.filter(c => c.cli_id == rowData.tiq_cliente.id)[0];
        this.selectedModelo = this.modelos.filter(c => c.mod_nombre == rowData.tiq_color)[0];
        this.selectedPlanta = this.Tiquete.tiq_planta;
        this.selectedReferencia = this.Tiquete.tiq_referencia['nombre'];
        this.MaterialesModelo = JSON.parse(this.Tiquete.tiq_material);

        var tallas = JSON.parse(this.Tiquete.tiq_tallas)
        var talla = tallas['tallas']
        let cadTallas = ''

        for (let i = 0; i < talla.length; i++) {
            if (talla[i] != null) {
                cadTallas += '(' + (i + 21) + ') : ' + talla[i] + ',  '
            }
        }
        this.Tiquete['cadTallas'] = cadTallas.substring(0, cadTallas.length - 3)

        this.title = "VISUALIZAR";
        this.display = true;
        this.viwer = true;
        this.value = 'COD: ' + rowData.tiq_codigo;
    }

    contarPares() {
        for (var i = 0; i - this.pares.length; i++) {
            if (this.pares[i] <= 0) {
                this.pares[i] = null;
            }
            if (this.pares[i] > 9) {
                this.pares[i] = 9
            }
        }
        this.totalPares = this.pares.reduce((a, b) => a + b, 0);
        this.calcularCantidadTotalMaterial();
    }


    calcularCantidadTotalMaterial() {
        for (let i = 0; i < this.MaterialesModelo.length; i++) {
            this.MaterialesModelo[i].cantidadTotal = (parseFloat(this.MaterialesModelo[i].cantidad.replace(' mts', '')) * this.totalPares).toFixed(2) + ' mts';
            this.MaterialesModelo[i].restante_real = (parseFloat(this.MaterialesModelo[i].restante.replace(' mts', '')) - parseFloat(this.MaterialesModelo[i].cantidadTotal.replace(' mts', ''))).toFixed(2) + ' mts';

            var restanteMaterial = parseFloat(this.MaterialesModelo[i].restante_real.replace(' mts', ''));
            if (restanteMaterial <= 0) {
                this.funcionesGenerales.showErrorViaToast('Material: ' + this.MaterialesModelo[i].nombre + ' agotado, no puede continuar creando este Ticket');
            }
        }
    }

    getColores() {
        this.RegistrosGeneralesService.listarByTipo('COLOR').subscribe(res => {
            this.colores = res['data'] as [];
            this.colores.sort((a, b) => {
                if (a.rege_nombre > b.rege_nombre) return 1;
                if (a.rege_nombre < b.rege_nombre) return -1;
                return 0;
            });
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
        });
    }


    getClientes() {
        this.ClienteService.listar().subscribe(res => {
            this.clientes = res['data'] as [];
            this.clientes.sort((a, b) => {
                if (a.cli_nombre > b.cli_nombre) return 1;
                if (a.cli_nombre < b.cli_nombre) return -1;
                return 0;
            });
        });
    }


    iniciarRegistro() {
        this.viwer = false;
        this.registro = true;
        this.display = !this.display;
        this.title = 'REGISTRAR'
        this.pares = new Array(30);
        this.Tiquete = new Tiquete();
    }

    registrarTiquete() {
        //Para este ajuste el color pasa a ser el nombre del modelo, el cual lleva el color inmerso
        //y el material pasa a ser una lista de varios materiales
        if (this.totalPares == 0) {
            return this.funcionesGenerales.showErrorViaToast("Selecciona pares");
        } else {
            var tallas = {
                tallas: this.pares
            }
            try {
                this.Tiquete.tiq_observaciones = this.tiq_observacion.toUpperCase();
                this.Tiquete.tiq_planta = this.selectedPlanta;
                this.Tiquete.tiq_material = JSON.stringify(this.MaterialesModelo);
                this.Tiquete.tiq_color = this.selectedModelo.mod_nombre;
                this.Tiquete.tiq_referencia = this.selectedModelo.mod_referencia;
                this.Tiquete.tiq_cliente_id = this.selectedCliente.cli_id;
                this.Tiquete.tiq_cliente_nombre = this.selectedCliente.cli_nombre;
                this.Tiquete.tiq_tallas = JSON.stringify(tallas);
                this.Tiquete.tiq_pares = '' + this.totalPares;
                this.Tiquete.tiq_estado = 'GENERADO';

                if (isNaN(this.multiplicador) || this.multiplicador == undefined) {
                    this.multiplicador = 1;
                }

                this.TiqueteService.registrar(this.Tiquete).subscribe(res => {
                    if (res['status']) {
                        this.getTiquetes();
                        this.validarCantidadRegistros();
                        this.display = false;
                        return this.funcionesGenerales.showSuccessViaToast(res['message']);
                    } else {
                        return this.funcionesGenerales.showErrorViaToast(res['message']);
                    }
                });

            } catch (error) {
                return this.funcionesGenerales.showErrorViaToast("Selecciona todos los campos");
            }
        }
    }

    validarCantidadRegistros() {
        this.multiplicador = this.multiplicador - 1;
        if (this.multiplicador > 0) {
            this.registrarTiquete();
        } else {
            this.limpiarFormulario();
        }
    }

    limpiarFormulario() {
        this.display = false;
        this.viwer = false;
        this.registro = false;
        this.Tiquete = new Tiquete();
        this.pares = new Array(30);
        this.tiq_observacion = '';
        this.selectedPlanta = undefined;
        this.selectedColor = undefined;
        this.selectedReferencia = undefined;
        this.selectedCliente = undefined;
        this.selectedModelo = undefined;
        this.MaterialesModelo = [];
        this.totalPares = 0;
        this.multiplicador = undefined
    }

    validarMultiplicador(event) {
        this.multiplicador = this.funcionesGenerales.validarNumeros(event);
        if (this.multiplicador < 1) {
            this.multiplicador = 1;
        }
        if (this.multiplicador > 5) {
            this.multiplicador = 5;
        }
    }


    iniciarMultiplicacion() {
        if (isNaN(this.multiplicador)) {
            this.multiplicador = 1;
        }
    }




















    public gPDF1() {


        const test = document.getElementsByClassName('barcode')

        console.log(test[0])

        var a = {
            allowTaint: true,
            onrendered: function (canvas) {
                document.body.appendChild(canvas);
                window.open(canvas.toDataURL());
            }
        }

        html2canvas(test[0] as HTMLElement, a)

        html2canvas(test[0] as HTMLElement).then(canvas => {
            console.log(canvas)
            const imgWidth = 170;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight;
            const contentDataURL = canvas.toDataURL('image/png');
            console.log(contentDataURL)
            const pdf = new jsPDF('p', 'mm', 'a4');

            var position = 50;
            pdf.addImage(contentDataURL, 'PNG', 70, position, imgWidth, imgHeight);
            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 40)

            position = 100;
            pdf.addImage(contentDataURL, 'PNG', 70, position, imgWidth, imgHeight);
            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 40)


            position = 150;
            pdf.addImage(contentDataURL, 'PNG', 70, position, imgWidth, imgHeight);
            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 40)


            pdf.save('invoice.pdf');
        });
    }



    public gPDF2() {
        svg.svgAsPngUri(document.querySelector(".barcode svg"), {}, (canvas) => {
            console.log(canvas)
            const imgWidth = 65;
            const pageHeight = 295;
            const imgHeight = 20
            const heightLeft = imgHeight;
            const contentDataURL = canvas
            console.log(contentDataURL)
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.setFontSize(9);
            console.log(this.Tiquete)

            var position = 20;
            pdf.text('CONTROL', 131, position - 10)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 80, position - 7)

            pdf.text('Cliente: ' + this.Tiquete.tiq_cliente_nombre, 80, position - 3)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 163, position - 3)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 80, position)
            pdf.addImage(contentDataURL, 'PNG', 130, position, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 80, position + 5)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 80, position + 9)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 80, position + 13)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 80, position + 17)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 80, position + 21)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 80, position + 25)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 80, position + 29)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 35)

            var position = 70;
            pdf.text('LIMPIADA', 80, position - 3)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 163, position - 3)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 80, position)
            pdf.addImage(contentDataURL, 'PNG', 130, position, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 80, position + 5)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 80, position + 9)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 80, position + 13)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 80, position + 17)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 80, position + 21)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 80, position + 25)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 80, position + 29)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 35)

            position = 120;
            pdf.text('MONTADA', 80, position - 3)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 163, position - 3)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 80, position)
            pdf.addImage(contentDataURL, 'PNG', 130, position, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 80, position + 5)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 80, position + 9)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 80, position + 13)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 80, position + 17)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 80, position + 21)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 80, position + 25)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 80, position + 29)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 35)

            position = 170;
            pdf.text('GUARNICIÓN', 80, position - 3)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 163, position - 3)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 80, position)
            pdf.addImage(contentDataURL, 'PNG', 130, position, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 80, position + 5)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 80, position + 9)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 80, position + 13)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 80, position + 17)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 80, position + 21)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 80, position + 25)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 80, position + 29)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 35)

            position = 220;
            pdf.text('LIMPIADA', 80, position - 3)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 163, position - 3)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 80, position)
            pdf.addImage(contentDataURL, 'PNG', 130, position, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 80, position + 5)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 80, position + 9)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 80, position + 13)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 80, position + 17)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 80, position + 21)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 80, position + 25)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 80, position + 29)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 35)


            pdf.save('Ticket' + this.Tiquete.tiq_codigo + '.pdf');
        });

    }



    public gPDF3() {
        svg.svgAsPngUri(document.querySelector(".barcode svg"), {}, (canvas) => {
            console.log(canvas)
            const imgWidth = 65;
            const pageHeight = 295;
            const imgHeight = 20
            const heightLeft = imgHeight;
            const contentDataURL = canvas
            console.log(contentDataURL)
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.setFontSize(11);
            console.log(this.Tiquete)

            var position = 20;
            pdf.text('CONTROL', 5, position - 10)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position - 7)

            pdf.text('Cliente: ' + this.Tiquete.tiq_cliente_nombre, 5, position - 4)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 5, position)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position + 2)
            pdf.addImage(contentDataURL, 'PNG', 5, position + 2, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 5, position + 25)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 5, position + 29)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 5, position + 33)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 5, position + 37)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 5, position + 41)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 5, position + 45)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 5, position + 49)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 53)


            var position = 100;
            pdf.text('LIMPIADA', 5, position - 10)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position - 7)

            pdf.text('Cliente: ' + this.Tiquete.tiq_cliente_nombre, 5, position - 4)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 5, position)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position + 2)
            pdf.addImage(contentDataURL, 'PNG', 5, position + 2, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 5, position + 25)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 5, position + 29)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 5, position + 33)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 5, position + 37)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 5, position + 41)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 5, position + 45)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 5, position + 49)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 53)


            var position = 180;
            pdf.text('MONTADA', 5, position - 10)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position - 7)

            pdf.text('Cliente: ' + this.Tiquete.tiq_cliente_nombre, 5, position - 4)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 5, position)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position + 2)
            pdf.addImage(contentDataURL, 'PNG', 5, position + 2, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 5, position + 25)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 5, position + 29)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 5, position + 33)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 5, position + 37)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 5, position + 41)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 5, position + 45)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 5, position + 49)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 53)


            var position = 260;
            pdf.text('GUARNICIÓN', 5, position - 10)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position - 7)

            pdf.text('Cliente: ' + this.Tiquete.tiq_cliente_nombre, 5, position - 4)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 5, position)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position + 2)
            pdf.addImage(contentDataURL, 'PNG', 5, position + 2, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 5, position + 25)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 5, position + 29)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 5, position + 33)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 5, position + 37)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 5, position + 41)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 5, position + 45)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 5, position + 49)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 53)


            var position = 340;
            pdf.text('CORTADA', 5, position - 10)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position - 7)

            pdf.text('Cliente: ' + this.Tiquete.tiq_cliente_nombre, 5, position - 4)
            pdf.text(this.Tiquete.tiq_fecha_creacion, 5, position)
            pdf.text('-----------------------------------------------------------------------------------------------------------', 0, position + 2)
            pdf.addImage(contentDataURL, 'PNG', 5, position + 2, imgWidth, imgHeight);
            pdf.text('Referencia: ' + this.Tiquete['tiq_referencia_nombre'], 5, position + 25)
            pdf.text('Color: ' + this.Tiquete.tiq_color, 5, position + 29)
            pdf.text('Material: ' + this.Tiquete.tiq_material, 5, position + 33)
            pdf.text('Planta: ' + this.Tiquete.tiq_planta, 5, position + 37)
            pdf.text('Pares: ' + this.Tiquete.tiq_pares, 5, position + 41)
            pdf.text('Tallas: ' + this.Tiquete['cadTallas'], 5, position + 45)

            pdf.text('Observaciones: ' + this.Tiquete.tiq_observaciones, 5, position + 49)

            pdf.text('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -', 0, position + 53)



            pdf.save('Ticket' + this.Tiquete.tiq_codigo + '.pdf');
        });

    }


}













