import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, MenuItem } from 'primeng/api';
import { FuncionesGenerales } from '../../FuncionesGenerales/funcionesGenerales';
import * as SecureLS from 'secure-ls';
import { AppComponent } from 'src/app/app.component';
import { EmpleadosService } from '../../../Services/empleados.service';
import { TiqueteService } from '../../../Services/tiquete.service';
import { RegistrosGeneralesService } from '../../../Services/registros-generales.service';
import { ClienteService } from '../../../Services/cliente.service';
import { element } from '@angular/core/src/render3';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pay-tiquete',
  templateUrl: './pay-tiquete.component.html',
  styleUrls: ['./pay-tiquete.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PayTiqueteComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private service: MessageService,
    public EmpleadosService: EmpleadosService,
    public funcionesGenerales: FuncionesGenerales,
    private app: AppComponent,
    public TiqueteService: TiqueteService,
    public RegistrosGeneralesService: RegistrosGeneralesService,
    public ClienteService: ClienteService
  ) { }

  areas = [];
  selectedArea;
  viwer: boolean;
  empleados = [];
  selectedEmpleado;
  referencias = [];

  numeroTicket = '';

  tiquetes = [];

  totalRegistros = 0;
  totalPagar = '$0';
  ngOnInit() {
    this.getReferencias();
    this.cargarAreas();
  }


  cargarAreas() {
    this.areas = [
      { label: 'CORTADA', value: 'CORTADA' },
      { label: 'GUARNICIÓN', value: 'GUARNICIÓN' },
      { label: 'LIMPIADA', value: 'LIMPIADA' },
      { label: 'MONTADA', value: 'MONTADA' },
    ];
  }

  getEmpleados() {
    this.EmpleadosService.listarByArea(this.selectedArea).subscribe(res => {
      if (res['status']) {
        this.empleados = res['data'] as [];
        this.empleados = this.empleados.filter(c => c.emp_estado == 'ACTIVO')
        this.empleados.sort((a, b) => {
          if (a.emp_nombre > b.emp_nombre) return 1;
          if (a.emp_nombre < b.emp_nombre) return -1;
          return 0;
        });
      }
    });
  }



  agregarTicket() {
    if (this.selectedArea == null || this.selectedEmpleado == null) {
      return this.funcionesGenerales.showErrorViaToast("Selecciona un Empleado");
    }
    if (this.numeroTicket == '' || this.numeroTicket == null) {
      return this.funcionesGenerales.showErrorViaToast("Selecciona un Ticket");
    }
    var repetido = this.tiquetes.filter(c => c.tiq_codigo == this.numeroTicket)
    if (repetido.length > 0) {
      return this.funcionesGenerales.showErrorViaToast("Este Ticket ya fue agregado");
    }
    this.getTiquete();
  }


  getTiquete() {
    var body = {
      tiqem_codigo: this.numeroTicket,
      tiqem_area: this.selectedArea
    }
    this.TiqueteService.buscarTiquetEmpleadoByCodigo(body).subscribe(res => {
      if (res['status']) {
        var tiquete = res['data'][0];
        this.cargarPreciosReferencia(tiquete);
      } else {
        return this.funcionesGenerales.showErrorViaToast(res['message']);
      }
    });
  }


  cargarPreciosReferencia(tiquete) {
    this.RegistrosGeneralesService.listarPrecioByReferencia(tiquete.tiq_referencia.id).subscribe(res => {
      if (res['status']) {
        if (this.selectedArea == 'CORTADA') {
          tiquete['tiq_precio_par'] = res['data'][0].prere_precio_cortada;
        }
        if (this.selectedArea == 'GUARNICIÓN') {
          tiquete['tiq_precio_par'] = res['data'][0].prere_precio_guarnicion;
        }
        if (this.selectedArea == 'MONTADA') {
          tiquete['tiq_precio_par'] = res['data'][0].prere_precio_montada;
        }
        if (this.selectedArea == 'LIMPIADA') {
          tiquete['tiq_precio_par'] = res['data'][0].prere_precio_limpiada;
        }
        this.tiquetes.push(tiquete);
        this.totalRegistros = this.tiquetes.length;

        this.totalPagar = this.totalPagar.replace(/[^0-9]+/g, '');
        var total = parseInt(this.totalPagar, 10);
        total = total + (parseInt(tiquete['tiq_precio_par'].replace(/[^0-9]+/g, ''), 10) * parseInt(tiquete['tiq_pares'], 10));
        this.totalPagar = this.funcionesGenerales.formatoMonedaText("" + total);
        this.viwer = true;
        this.numeroTicket = '';
        return this.funcionesGenerales.showSuccessViaToast("Ticket cargado");
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
    });
  }


  cancelarPago() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea cancelar el pago para: ' + this.selectedEmpleado.emp_nombre + '?',
      accept: () => {
        this.limpiarData();
      }
    });
  }

  realizarPago() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea realizar el pago para: ' + this.selectedEmpleado.emp_nombre + '?',
      accept: () => {

        var Tickets = [];
        Tickets = this.tiquetes.map(c => this.depurarInfoTiquete(c));

        var body = {
          tickets: Tickets,
          tiqem_area: this.selectedArea,
          tiqem_empleado_nombre: this.selectedEmpleado.emp_nombre,
          tiqem_empleado_id: this.selectedEmpleado.emp_id,
          tiqem_valor_pago: this.totalPagar,
          tiqem_cantidad_tickets: this.totalRegistros
        }

        this.TiqueteService.pagarTiquetes(body).subscribe(res => {
          if (res['status']) {
            this.generarPDF();
            return this.funcionesGenerales.showSuccessViaToast(res['message']);
          }
          return this.funcionesGenerales.showSuccessViaToast(res['message']);
        });
      }
    });
  }

  depurarInfoTiquete(tiquete) {
    return {
      tiq_codigo: tiquete['tiq_codigo'],
      tiq_color: tiquete['tiq_color'],
      tiq_referencia: tiquete['tiq_referencia'],
      tiq_pares: tiquete['tiq_pares'],
      tiq_precio_par: tiquete['tiq_precio_par'],
      tiq_planta: tiquete['tiq_planta']
    }
  }


  limpiarData() {
    this.viwer = false;
    this.totalPagar = '$0'
    this.selectedArea = null;
    this.selectedEmpleado = null;
    this.empleados = [];
    this.numeroTicket = '';
    this.tiquetes = [];
    this.totalRegistros = 0;
  }


  eliminarTicket(tiq) {

    this.totalRegistros = this.totalRegistros - 1;
    if (this.totalRegistros == 0) {
      this.limpiarData();
      return;
    }

    this.tiquetes = this.tiquetes.filter(c => c.tiq_codigo != tiq.tiq_codigo);

    this.totalPagar = this.totalPagar.replace(/[^0-9]+/g, '');
    var total = parseInt(this.totalPagar, 10);
    total = total - (parseInt(tiq['tiq_precio_par'].replace(/[^0-9]+/g, ''), 10) * parseInt(tiq['tiq_pares'], 10));
    this.totalPagar = this.funcionesGenerales.formatoMonedaText("" + total);
  }

  @ViewChild('content') content: ElementRef;
  generarPDF() {


    var doc = new jsPDF();
    var col = ["Id", "TypeID", "Accnt", "Amnt", "Start", "End", "Contrapartida"];
    var rows = [];

    var rowCountModNew = [
      ["1721079361", "0001", "2100074911", "200", "22112017", "23112017", "51696"],
      ["1721079362", "0002", "2100074912", "300", "22112017", "23112017", "51691"],
      ["1721079363", "0003", "2100074913", "400", "22112017", "23112017", "51692"],
      ["1721079364", "0004", "2100074914", "500", "22112017", "23112017", "51693"]
    ]

    rowCountModNew.forEach(element => {
      rows.push(element);
    });


    // doc.addImage(imgData, 'JPEG', 90, 60, 20, 20);

    let plantillaHTML = '<div style="width: 70%;">'
    '<h1 style="text-align: center;">COMPROBANTE DE PAGO DE TICKETS</h1>' +
      '<p style="text-align: center; font-weight: bold; font-size: 20px;">10-ene-2020 10:30 am</p>' +
      '<div style="width: 100%; background-color: #ff980066; display: flex; padding-left: 1%;">' +
      '<div style="width: 50%; float: left;">' +
      '<p>Nomnre Empleado: VARIABLE_NOMBRE</p>' +
      '</div>' +
      '<div style="width: 50%; float: right;">' +
      '<p>Area de trabajo: VARIABLE_AREA</p>' +
      '</div>' +
      '</div>' +
      '</div>'

    var newDiv = document.createElement("div");

    console.log(document.getElementById('plantillaPDF'))

    var elementHandler = {
      "#editor": function (element, renderer) {
        return true;
      }
    }

    //const elementToPrint = document.getElementById('plantillaPDF'); //The html element to become a pdf
    //const pdf = new jsPDF('p', 'pt', 'a4');
    //pdf.addHTML(elementToPrint, () => {
    //   doc.save('web.pdf');
    //});


    //   doc.autoTable(col, rows);
    doc.fromHTML(document.getElementById('content'), 15, 15, {
      "width": 170,
      "elementHandlers": elementHandler
    });
    doc.save('Test.pdf');

    this.limpiarData();
  }


  htmltoPDF() {
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#content")).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');

    });


  }


  gPDF() {
    {
      let data = document.getElementById('content');
      html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
        // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
        pdf.save('Filename.pdf');
      });
    }

  }


  public captureScreen() {
    const data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('invoice.pdf');
    });
  }



}
