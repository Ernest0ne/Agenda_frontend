/**
 * * Este service contiene metodos para transformar objetos tipo STRING
 */

import { Injectable, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import * as SecureLS from 'secure-ls';
import { from } from 'rxjs';


@Injectable()
export class UtilitiesConfigString {

    public msgConfirmDelete = '¿Está seguro de que desea eliminar ';
    public msgToastSuccessfullCreate = 'El registro ha sido creado exitosamente';
    public msgToastSuccessfullUpdate = 'El registro ha sido actualizado exitosamente';
    public msgToastSuccessfullDelete = 'El registro ha sido eliminado exitosamente';
    public msgToastError = 'Ha ocurrido un error en el proceso';
    public msgEmptyTable = 'No se encontraron registros';
    public modal = true;
    public blockScroll = true;
    public dismissableMask = false;
    public name_default_group = 'DEFAULT_GROUP';
    public sizeMarker = { w: 45, h: 60 };
    ls = new SecureLS({ encodingType: 'aes', isCompression: false });
    public items_status = [
        { label: 'ACTIVO', value: 'ACTIVO' },
        { label: 'INACTIVO', value: 'INACTIVO' }
    ];
    public items_card_types = [
        { label: 'CRÉDITO', value: 'CREDITO' },
        { label: 'DÉBITO', value: 'DEBITO' }
    ];
    public status_update = [
        { label: 'ACTUALIZADO', value: 'ACTUALIZADO' },
        { label: 'PENDIENTE', value: 'PENDIENTE' }
    ];
    public status = [
        { label: 'ACTUALIZADO', value: 'ACTUALIZADO' },
        { label: 'DESACTUALIZADO', value: 'DESACTUALIZADO' }
    ];
    public interface_comunication = [
        { label: 'GPRS', value: 'GPRS' },
        { label: 'DIALUP', value: 'DIALUP' },
        { label: 'LAN', value: 'LAN' },
        { label: 'LANGPRS ', value: 'LANGPRS' }
    ];
    public brand = [
        // { label: 'SPECTRA', value: 'SPECTRA' },
        { label: 'NEWPOS', value: 'NEWPOS' },
    ];
    public model = [
        { label: 'NEW9220', value: 'NEW9220' },
        // { label: 'T1000', value: 'T1000' },
    ];
    public types_terminals = [
        { label: 'POS', value: 'POS' },
        { label: 'PC', value: 'PC' },
        { label: 'WEB', value: 'WEB' },
    ];

    public types_rules_obfuscation = [
        { label: 'GENERAL', value: 'GENERAL' },
        { label: 'EMAIL', value: 'EMAIL' },
        { label: 'FECHA', value: 'FECHA' },
    ];

    public language = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: 'Hoy',
        clear: 'Limpiar',
        dateFormat: 'yy-mm-dd',
        weekHeader: 'Wk'
    };

    public items_type_certificate = [
        { label: 'TRANSACCIONES AGEB AGEF', value: 'TRANSACCION_PRIVADA' },
        { label: 'TRANSACCIONES AGEF AGEB', value: 'TRANSACCION_PUBLICA' },
        { label: 'N. TARJETA', value: 'NUMERO_TARJETA' },
        { label: 'N. TARJETA / CUENTA', value: 'NUMERO_CUENTA' },
        { label: 'TWK / LLAVE GIROS ', value: 'LLAVE' },
        { label: 'TLS AGEF AGEB', value: 'TLS' },
        { label: 'TLS AGEF POLARIS', value: 'TLS_POS_BACKEND' },
        { label: 'TLS POLARIS AGEB', value: 'TLS_BACKEND_CLIENTE' }
    ];

    public items_type_credentials = [
        'TRANSACCION',
        'INICIALIZACION'
    ];

    public colors = [
        '#e39280',
        '#80e3a3',
        '#8088e3',
        '#e3cf80'
    ];

    public departamentos = [
        { label: 'ACTUALIZADO', value: 'ACTUALIZADO' },
        { label: 'DESACTUALIZADO', value: 'DESACTUALIZADO' }
    ];


    public facultades = [
        { label: 'ACTUALIZADO', value: 'ACTUALIZADO' },
        { label: 'DESACTUALIZADO', value: 'DESACTUALIZADO' }
    ];


    public statusCitas = [
        { label: 'AGENDADA', value: 'AGENDADA' },
        { label: 'PERDIDA', value: 'PERDIDA' },
        { label: 'REALIZADA', value: 'REALIZADA' }
    ];

    public optionsChartBeginAtZero = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    constructor(private messageService: MessageService) { }

    /**
     * 
     * @param msg mensaje a mostrar en la alerta de exito - verde
     */
    showToastSuccess(msg) {
        this.messageService.add({ severity: 'success', summary: '', detail: msg });
    }

    /**
     * 
     * @param msg mensaje a mostrar en la alerta informativa - azul
     */
    showToastInfo(msg) {
        this.messageService.add({ severity: 'info', summary: '', detail: msg });
    }

    /**
     * 
     * @param msg mensaje a mostrar en la alerta de advertencia - amarilla
     */
    showToastWarn(msg) {
        this.messageService.add({ severity: 'warn', summary: '', detail: msg });
    }

    /**
     * 
     * @param msg mensaje a mostrar en la alerta de error - roja
     */
    showToastError(msg) {
        this.messageService.add({ severity: 'error', summary: '', detail: msg });
    }

    /**
     * 
     * @param name ID del elemento html
     * Método para ocultar o mostrar una contraseña y cambiar el icono "eye"
     */
    showPassword(name) {
        let x = document.getElementById(name) as HTMLElement;
        if (x.getAttribute('type') === "password") {
            x.setAttribute('type', 'text');
            return 'icon-eye';
        } else {
            x.setAttribute('type', 'password');
            return 'icon-eye-slash'
        }
    }

    /**
     * 
     * @param event solo texto y numeros con espacios
     */
    convertOnlyTextNumber(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑ a-záéíóúñ0-9]+/g, '').trimLeft();
        let start = event.target.selectionStart;
        event.target.value = event.target.value.toUpperCase();
        event.target.selectionStart = start;
        event.target.selectionEnd = start;
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo texto y numero sin espacios
     */
    convertOnlyTextNumberWithoutSpace(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑa-záéíóúñ0-9]+/g, '').trimLeft();
        let start = event.target.selectionStart;
        event.target.value = event.target.value.toUpperCase();
        event.target.selectionStart = start;
        event.target.selectionEnd = start;
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo texto y numeros con . _ -
     */
    convertOnlyTextNumberAplications(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑa-záéíóúñ0-9  . _ -]+/g, '').trimLeft();
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }


    /**
   * 
   * @param event solo texto y numeros con . &ü¨' -
   */
    convertOnlyTextNumberBranchOffice(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑa-záéíóúñ0-9  .&'ü¨-]+/g, '').trimLeft();
        event.target.value = event.target.value.toUpperCase();
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo texto y numeros con . _ - sin espacios
     */
    convertOnlyTextNumberAplicationsWithoutSpace(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑa-záéíóúñ0-9._-]+/g, '').trimLeft();
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo numeros y guiones -
     */
    convertOnlyNumberGuion(event, form) {
        event.target.value = event.target.value.replace(/[^0-9-]+/g, '').trimLeft();
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo numeros y sin espacios
     */
    convertOnlyNumber(event, form) {
        event.target.value = event.target.value.replace(/[^0-9]+/g, '').trimLeft();
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo numeros y sin espacios
     */
    convertThousand(event, form) {
        event.target.value = event.target.value.replace(/[^0-9.,]+/g, '').trimLeft();
        if (form.value) {
            let str: string = form.value
            let aux: string[] = str ? str.split('.') : [];
            let aux2: string[];
            let a: any;
            if (aux[0].indexOf(',') > 0) {
                aux2 = aux[0].split(',');
                a = aux2[0] + aux2[1] + aux[1];
            } else {
                a = aux[0] + aux[1];
            }
            event.target.value = this.addCommas(this.formatMiles(a));
            if (event.target.value === 'NaN') {
                form.setValue('0.00', { emitEvent: false })
            } else {
                form.setValue(event.target.value, { emitEvent: false })
            }
        } else {
            return event.target.value;
        }
    }


    addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    formatMiles(valor: string) {
        let formatOut: string = '';
        if (valor.length > 2) {
            formatOut = valor.substring(0, valor.length - 2) + "." + valor.substring(valor.length - 2);
        } else if (valor.length == 2) {
            formatOut = "0." + valor;
        } else {
            formatOut = "0.0" + valor;
        }
        return parseFloat(formatOut).toFixed(2);
    }

    /**
     * 
     * @param event solo numeros sin 0
     */
    convertOnlyNumberNot0(event, form) {
        event.target.value = event.target.value.replace(/[^1-9]+/g, '').trimLeft();
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo texto y con espacios
     */
    convertOnlyText(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑ a-záéíóúñ]+/g, '').trimLeft();
        let start = event.target.selectionStart;
        event.target.value = event.target.value.toUpperCase();
        event.target.selectionStart = start;
        event.target.selectionEnd = start;
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value
        }
    }

    /**
    * 
    * @param event solo texto y con espacios SIN MAYUSCULAS
    */
    convertOnlyTextWithoutMayus(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑ a-záéíóúñ]+/g, '').trimLeft();
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo texto, numeros y - # . para direcciones
     */
    convertOnlyTextAddress(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑ a-záéíóúñ0-9  # . -]+/g, '').trimLeft();
        let start = event.target.selectionStart;
        event.target.value = event.target.value.toUpperCase();
        event.target.selectionStart = start;
        event.target.selectionEnd = start;
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo texto con separadores / _ - para urls
     */
    convertOnlyTextUrl(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑ a-záéíóúñ 0-9.: / _ -]+/g, '').trimLeft();
        event.target.value = event.target.value.replace(' ', '');
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param event solo numeros con . para direcciones ip
     */
    convertOnlyNumberPunto(event, form) {
        event.target.value = event.target.value.replace(/[^0-9.]+/g, '').trimLeft();
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
    * 
    * @param event solo numeros y letras con : y - para MAC
    */
    convertOnlyMAC(event, form) {
        event.target.value = event.target.value.replace(/[^0-9:ABCDEFabcdef]+/g, '').trimLeft();
        let start = event.target.selectionStart;
        event.target.value = event.target.value.toUpperCase();
        event.target.selectionStart = start;
        event.target.selectionEnd = start;
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
     * 
     * @param array listado de objetos a ordenar
     * @param property campo en base al cual se hara el ordenamiento
     * Ordenamiento ascendente
     */
    sortAscending(array, property) {
        array.sort((a, b) => {
            if (a[property] > b[property]) {
                return 1;
            }
            if (a[property] < b[property]) {
                return -1;
            }
            return 0;
        });
        return array;
    }

    /**
     * @param array listado de objetos a ordenar
     * @param property campo en base al cual se hara el ordenamiento
     * Ordenamiento descendente
     */
    sortDescending(array, property) {
        array.sort((a, b) => {
            if (a[property] < b[property]) {
                return 1;
            }
            if (a[property] > b[property]) {
                return -1;
            }
            return 0;
        });
        return array;
    }

    /**
     * 
     * @param event solo texto UUID
     */
    convertOnlyUUID(event, form) {
        event.target.value = event.target.value.replace(/[^abcdef0-9-]+/g, '').trimLeft();
        let start = event.target.selectionStart;
        event.target.value = event.target.value.toLowerCase();
        event.target.selectionStart = start;
        event.target.selectionEnd = start;
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value;
        }
    }

    /**
   * 
   * @param event solo correos electronicos
   */
    convertOnlyEmail(event, form) {
        event.target.value = event.target.value.replace(/[^A-ZÁÉÍÓÚÑa-záéíóúñ._@0123456789-]+/g, '').trimLeft();
        let start = event.target.selectionStart;
        event.target.value = event.target.value.toLowerCase();
        event.target.selectionStart = start;
        event.target.selectionEnd = start;
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value
        }
    }


    /**
    * 
    * @param event solo fechas: numeros y /
    */
    convertOnlyDate(event, form) {
        event.target.value = event.target.value.replace(/[^/0123456789]+/g, '').trimLeft();
        let start = event.target.selectionStart;
        event.target.value = event.target.value.toLowerCase();
        event.target.selectionStart = start;
        event.target.selectionEnd = start;
        if (form.value) {
            form.setValue(event.target.value, { emitEvent: false })
        } else {
            return event.target.value
        }
    }



    /**
     * 
     * @param event Elimina el registro si contiene *
     */
    clearValueWithAsterisk(event, form) {
        if (event.target.value.indexOf("*") != -1) {
            if (form.value) {
                form.setValue('', { emitEvent: false })
            } else {
                return '';
            }
        }
    }


    /**
     * @param item listado de objetos de permisos
     * Objeto de permisos formateado
     */
    transformPermissions(item) {
        let permissions = {
            createAction: false,
            updateAction: false,
            deleteAction: false,
            viewAction: false,
            sucursalAssociateAction: false,
            terminalAssociateAction: false,
            createSucursalAction: false,
            deleteSucursalAction: false,
            updateSucursalAction: false
        };
        if (item) {
            item.forEach(element => {
                if (element.nombre === 'VER') {
                    permissions['viewAction'] = true;
                } else if (element.nombre === 'EDITAR') {
                    permissions['viewAction'] = true;
                    permissions['updateAction'] = true;
                } else if (element.nombre === 'ELIMINAR') {
                    permissions['deleteAction'] = true;
                } else if (element.nombre === 'CREAR') {
                    permissions['createAction'] = true;
                } else if (element.nombre === 'ASOCIAR_SUCURSAL') {
                    permissions['sucursalAssociateAction'] = true;
                } else if (element.nombre === 'DESASOCIAR_TERMINAL') {
                    permissions['viewAction'] = true;
                    permissions['updateAction'] = true;
                    permissions['terminalAssociateAction'] = true;
                } else if (element.nombre === 'CREAR_SUCURSAL') {
                    permissions['createSucursalAction'] = true;
                } else if (element.nombre === 'ELIMINAR_SUCURSAL') {
                    permissions['deleteSucursalAction'] = true;
                } else if (element.nombre === 'EDITAR_SUCURSAL') {
                    permissions['viewAction'] = true;
                    permissions['updateAction'] = true;
                    permissions['updateSucursalAction'] = true;
                }

            });
        }
        return permissions;
    }

    /**
    * @param item Texto
    * Objeto enmascarado
    */
    transformMask(item) {
        let mask = "";
        for (let index = 4; index < item.length; index++) {
            mask += "*"
        }
        item = item.substr(0, 4) + mask;
        return item;
    }

    /**
    * @param item Texto que representa una IP
    * boolean que indica si la IP es valida
    */
    validateIp(ip) {
        if (ip != '0.0.0.0' && ip != '255.255.255.255' && ip.match(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)) {
            return true;
        } else {
            return false;
        }
    }
}