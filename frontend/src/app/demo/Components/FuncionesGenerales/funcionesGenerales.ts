import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';
import { NotificationsService } from '../../Services/notifications.service';
import { MessageService } from 'primeng/api';
import { DeviceDetectorService } from 'ngx-device-detector';
import { element } from '@angular/core/src/render3';

@Injectable()
export class FuncionesGenerales {
    es = {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
            'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        today: 'Hoy',
        clear: 'Limpiar',
        dateFormat: 'dd-mm-yy',
        weekHeader: 'Wk'
    };
    configSwiper = {
        direction: 'vertical',
        effect: 'slide',
        speed: 400,
        spaceBetween: 0,
        init: true,
        autoHeight: true,
        slidesPerView: 1,
        slidesPerColumn: 1,
        grabCursor: true,
        setWrapperSize: true,
        uniqueNavElements: true,
        releaseOnEdges: true,
        watchOverflow: true,
        keyboard: true,
        a11y: true,
        navigation: false,
        pagination: false,
        mousewheel: true,
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            snapOnRelease: true,
            hide: false
        }
    };
    indexSwiper = 0;
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    ls = new SecureLS({ encodingType: 'aes' });

    public geoDistLevel1 = () => {
        let geoDist = this.ls.get('cofl_geodist');
        if (geoDist == null || geoDist == '') geoDist = '-';

        geoDist = geoDist.split('-');
        return geoDist[0];
    };

    public geoDistLevel2 = () => {
        let geoDist = this.ls.get('cofl_geodist');
        if (geoDist == null || geoDist == '') geoDist = '-';

        geoDist = geoDist.split('-');
        return geoDist[1];
    };

    constructor(private service: MessageService, private notificationsService: NotificationsService,
        private deviceService: DeviceDetectorService) {
    }

    eliminarDuplicados(dato) {
        const sinRepetidosx = dato.filter(
            (valorActual, indiceActual, arreglo) => {
                return (
                    arreglo.findIndex(
                        valorDelArreglo =>
                            JSON.stringify(valorDelArreglo) ===
                            JSON.stringify(valorActual)
                    ) === indiceActual
                );
            }
        );
        return sinRepetidosx;
    }
    eliminarDuplicadosPorAtri(dato, attr) {
        const sinRepetidosx = dato.filter(
            (valorActual, indiceActual, arreglo) => {
                return (
                    arreglo.findIndex(
                        valorDelArreglo =>
                            JSON.stringify(valorDelArreglo[attr]) ===
                            JSON.stringify(valorActual[attr])
                    ) == indiceActual
                );
            }
        );
        return sinRepetidosx;
    }

    ordenarAcendente(array, propiedad) {
        array.sort((a, b) => {
            if (a[propiedad] > b[propiedad]) {
                return 1;
            }
            if (a[propiedad] < b[propiedad]) {
                return -1;
            }
            return 0;
        });

        return array;
    }

    ordenarDesendente(array, propiedad) {
        array.sort((a, b) => {
            if (a[propiedad] < b[propiedad]) {
                return 1;
            }
            if (a[propiedad] > b[propiedad]) {
                return -1;
            }
            return 0;
        });

        return array;
    }

    ordenarFechaAscendente(array, propiedad) {
        return array.sort(
            (a, b) =>
                new Date(a[propiedad]).getTime() -
                new Date(b[propiedad]).getTime()
        );
    }

    ordenarFecha(array, propiedad) {
        return array.sort((a, b) => {
            if (
                new Date(
                    a[propiedad].replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
                ) <
                new Date(
                    b[propiedad].replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
                )
            ) {
                return 1;
            }
            if (
                new Date(
                    a[propiedad].replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
                ) >
                new Date(
                    b[propiedad].replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
                )
            ) {
                return -1;
            }
            return 0;
        });
    }

    formatearFecha(date) {
        if (date == null || date == undefined || date == '' || date == ' ') {
            return '';
        }
        const f = new Date(date);

        let dia = '' + f.getDate();
        let mes = '' + (f.getMonth() + 1);
        let min = '' + f.getMinutes();
        let h = '' + f.getHours();
        if (dia.length == 1) {
            dia = '0' + dia;
        }
        if (mes.length == 1) {
            mes = '0' + mes;
        }
        if (min.length == 1) {
            min = '0' + min;
        }
        if (h.length == 1) {
            h = '0' + h;
        }
        return dia + '-' + mes + '-' + f.getFullYear() + '  ' + h + ':' + min;
    }

    formatearFechasYear(date) {
        const f = new Date(date);
        let dia = '' + f.getDate();
        let mes = '' + (f.getMonth() + 1);
        let min = '' + f.getMinutes();
        let h = '' + f.getHours();
        if (dia.length == 1) {
            dia = '0' + dia;
        }
        if (mes.length == 1) {
            mes = '0' + mes;
        }
        if (min.length == 1) {
            min = '0' + min;
        }
        if (h.length == 1) {
            h = '0' + h;
        }
        return f.getFullYear() + '-' + mes + '-' + dia + '  ' + h + ':' + min;
    }

    castearFecha(fecha) {
        const res = fecha.split('-');
        const dia = res[0];
        const mes = res[1];
        let anio = res[2];
        const resH = anio.split(' ');
        anio = resH[0];
        const hora = resH[2];

        return anio + '-' + mes + '-' + dia + ' ' + hora;
    }

    textoSoloLetrasYNumeros(texto) {
        const variable = texto.replace(/[^0-9a-zA-Z]+/g, '').toUpperCase();
        return variable;
    }

    ordenarAcendenteCuandoEsNumero(array, propiedad) {
        array.sort((a, b) => {
            if (parseInt(a[propiedad]) > parseInt(b[propiedad])) {
                return 1;
            }
            if (parseInt(a[propiedad]) < parseInt(b[propiedad])) {
                return -1;
            }
            return 0;
        });

        return array;
    }

    formatearFechaRestandoDias(date, cantidad) {
        const f = new Date(date);
        let dia = '' + (f.getDate() - cantidad);
        let mes = '' + (f.getMonth() + 1);
        let min = '' + f.getMinutes();
        let h = '' + f.getHours();
        if (dia.length == 1) {
            dia = '0' + dia;
        }
        if (mes.length == 1) {
            mes = '0' + mes;
        }
        if (min.length == 1) {
            min = '0' + min;
        }
        if (h.length == 1) {
            h = '0' + h;
        }
        return dia + '-' + mes + '-' + f.getFullYear();
    }

    formatearFechaCorta(date) {
        const f = new Date(date);
        let dia = '' + f.getDate();
        let mes = '' + (f.getMonth() + 1);
        let min = '' + f.getMinutes();
        let h = '' + f.getHours();
        if (dia.length == 1) {
            dia = '0' + dia;
        }
        if (mes.length == 1) {
            mes = '0' + mes;
        }
        if (min.length == 1) {
            min = '0' + min;
        }
        if (h.length == 1) {
            h = '0' + h;
        }


        //return dia + '-' + mes + '-' + f.getFullYear();

        return f.getFullYear() + '-' + mes + '-' + dia
    }

    formatearFechaMasCorta(date, cantidad) {
        const f = new Date(date);
        const mesLetra = [
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul',
            'Ago',
            'Sep',
            'Oct',
            'Nov',
            'Dic'
        ];
        let dia = '' + (f.getDate() - cantidad);
        const mes = f.getMonth();
        if (dia.length == 1) {
            dia = '0' + dia;
        }
        return dia + '-' + mesLetra[mes];
    }

    zoomActive(event) {
        let arrayClass = [];
        const body = event.path.find(c => {
            return c.tagName == 'BODY';
        });
        arrayClass = Array.from(event.path[2].classList);
        if (arrayClass.includes('galleryModal')) {
            event.path[2].className = 'ui-g-12 ui-md-12 galleryBox galleryNormal';
            event.path[0].className = 'icon-fullscreen';
            body.classList.remove('galleryZoomActive');
        } else {
            event.path[2].className = 'ui-g-12 galleryBox galleryModal ui-md-12';
            event.path[0].className = 'icon-cancel';
            if (!body.classList.contains('ui-overflow-hidden')) {
                body.classList.add('ui-overflow-hidden');
            }
            body.classList.add('galleryZoomActive');
        }
    }

    limpiarEspacios(cadena) {
        const text = cadena.split(' ');
        let textFinal = '';
        text.forEach(element => {
            if (element != '' && element != null) {
                textFinal += element + ' ';
            }
        });
        textFinal = textFinal.substring(0, textFinal.length - 1);
        return textFinal;
    }


    enviarNotificacion(mensaje, destinatario) {
        const respuesta = false;
        const body = {
            msg: mensaje,
            type: 'Exitosa',
            dest: destinatario,
            origin: this.ls.get('user_code')
        };
        return new Promise((resolve, reject) => {
            this.notificationsService.crearNotificacion(body).subscribe(res => {
                if (res && res != undefined && res != null) {
                    let respuesta = res as {};
                    if (respuesta['message'] == 'success') {
                        respuesta = true;
                    } else {
                        respuesta = false;
                    }
                }
            });
            resolve(respuesta);
        });
    }

    convertirTecnologiaLetras(tecnologia) {
        const tecnologias = tecnologia.split(',');
        let dato = '';
        for (let i = 0; i < tecnologias.length; i++) {
            if (tecnologias[i] == 1) {
                dato += 'DIAL,';
            }
            if (tecnologias[i] == 2) {
                dato += 'LAN,';
            }
            if (tecnologias[i] == 3) {
                dato += 'GPRS,';
            }
            if (tecnologias[i] == 4) {
                dato += 'WIFI,';
            }
            if (tecnologias[i] == 5) {
                dato += "BLUETOOTH,";
            }
        }
        return dato;
    }

    getUnique(arr, comp) {
        // store the comparison  values in array
        const unique = arr
            .map(e => e[comp])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & return unique objects
            .filter(e => arr[e])
            .map(e => arr[e]);
        return unique;
    }

    validarNumeros(event) {
        event.target.value = event.target.value.replace(/[^0-9]+/g, '');
        return event.target.value
    }

    validarTexto(event) {
        event.target.value = event.target.value.replace(/[^A-Z a-z]+/g, '');
    }

    validarAlfaNumerico(event) {
        event.target.value = event.target.value.replace(/[^A-Za-z0-9]+/g, '');
    }

    validarPermitidos(event, caso) {
        const regex = this.obtenerRegex();
        switch (caso) {
            case 1:
                event.target.value = event.target.value.replace(regex['code'], '').replace(' ', '');
                break;
            case 2:
                event.target.value = event.target.value.replace(regex['serial'], '').replace(' ', '');
                break;
            default:
                break;
        }
    }

    validarTextoA(event) {
        event.target.value = event.target.value
            .replace(/[^A-Z .,: a-zñÑáéíóúÁÉÍÓÚÜ0-9-]+/g, '')
            .toUpperCase();
    }

    validarDireccion(event) {
        event.target.value = event.target.value
            .replace(/[^A-Z .,: a-zñÑáéíóúÁÉÍÓÚÜ0-9#-]+/g, '')
            .toUpperCase();
    }

    showWarnViaToast(mensage: string) {
        this.service.add({
            key: 'tst',
            severity: 'warn',
            summary: 'Error',
            detail: mensage
        });
    }

    showErrorViaToast(mensage: string) {
        this.service.add({
            key: 'tst',
            severity: 'error',
            summary: 'Error',
            detail: mensage
        });
    }

    showSuccessViaToast(mensage: string) {
        this.service.add({
            key: 'tst',
            severity: 'success',
            summary: 'Éxito',
            detail: mensage
        });
    }

    showInfoViaToast(mensage: string) {
        this.service.add({
            key: 'tst',
            severity: 'info',
            summary: 'Advertencia',
            detail: mensage
        });
    }

    activeSearch(event) {
        const bandera = event.path[1].classList.value as String;
        if (!bandera.includes('inactive')) {
            event.path[0].children[0].classList.value =
                event.path[0].children[0].classList.value.substring(0, 40) +
                ' icon-buscar inactive';
            event.path[1].children[1].classList.value =
                event.path[1].children[1].classList.value + ' hidewidth';
            event.path[1].classList.value = 'contentSearch inactive';
            event.path[2].children[1].classList.value = event.path[2].children[1].classList.value.replace(
                'opacity',
                ''
            );
        } else {
            event.path[0].children[0].classList.value =
                event.path[0].children[0].classList.value.substring(0, 40) +
                ' pi pi-arrow-left';
            event.path[1].children[1].classList.value = event.path[1].children[1].classList.value.replace(
                'hidewidth',
                ''
            );
            event.path[1].classList.value = 'contentSearch';
            event.path[2].children[1].classList.value =
                event.path[2].children[1].classList.value + ' opacity';
        }
    }

    // Action triggered when user swipes
    swipe(selectedIndex, cantidad, action = this.SWIPE_ACTION.RIGHT) {
        // Out of range
        if (selectedIndex < 0 || selectedIndex > cantidad) { return; }

        // Swipe left, next tab
        if (action === this.SWIPE_ACTION.LEFT) {
            const isLast = selectedIndex === cantidad;
            return (selectedIndex = isLast ? 0 : selectedIndex + 1);
        }

        // Swipe right, previous tab
        if (action === this.SWIPE_ACTION.RIGHT) {
            const isFirst = selectedIndex === 0;
            return (selectedIndex = isFirst ? cantidad : selectedIndex - 1);
        }
    }

    public contarDiferenciaDeDias(fechaInicio, fechaFin) {
        const fechaini = new Date(fechaInicio);
        const fechafin = new Date(fechaFin);
        const diasdif = fechafin.getTime() - fechaini.getTime();
        return Math.round(diasdif / (1000 * 60 * 60 * 24));
    }

    getRandomColor(colors) {
        const numero = Math.floor(Math.random() * colors.length);
        const color = colors[numero];
        colors.splice(numero, 1);
        return color;
    }

    getScreenWidth(): number {
        return window.innerWidth;
    }

    getDevice() {
        return !this.deviceService.isDesktop();
    }

    botonActive(event) {
        let opciones = event.path.find(element => element.classList.contains("content-op"));
        opciones = Array.from(opciones.children);
        for (let index = 0; index < opciones.length; index++) {
            const element = opciones[index];
            if (event.path.includes(element)) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        }
    }

    obtenerRegex() {
        let caracters = this.ls.get('companyValidate');
        let code, serial;
        if (caracters && caracters != null && caracters != '{}') {
            caracters = JSON.parse(caracters + '');
            code = new RegExp('[^0-9' + caracters['unique_code'] + ']', "g");
            serial = new RegExp('[^A-Za-z0-9' + caracters['serial'] + ']', "g");
            return { "code": code, "serial": serial }
        }
        return false;
    }

    existsBtnPrev() {
        var element = document.querySelector(".btnPrev") as HTMLElement;
        if (element != null) {
            return true;
        } else {
            return false;
        }
    }

    changePlural(word) {
        let end = word.charAt(word.length - 1);
        if (end == 'a' || end == 'e' || end == 'i' || end == 'o' || end == 'u') return word + 's';
        else return word + 'es'
    }

    mayuscula(event) {
        return event.toUpperCase();
    }

    formatoFiltro(array) {
        array = array.map(c => c.rege_nombre);
        return array
    }

    formatoMoneda(event) {
        var precio = this.validarNumeros(event)

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        })
        return event.target.value = formatter.format(precio).replace(',', '.');
    }

    formatoMonedaText(text) {
        text = text.replace(/[^0-9]+/g, '');

        if (text.length > 6) {
            text = text.substring(0, 6)
        }

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });

        return formatter.format(text).replace(',', '.');
    }

    formatoMonedaText2(text) {
        text = text.replace(/[^0-9]+/g, '');

        if (text.length > 6) {
            text = text.substring(0, 6)
        }

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });

        if (formatter.format(text).replace(',', '.') == '$0') {
            return '';
        }

        return formatter.format(text).replace(',', '.');
    }


    formatoCantidadMetrosText(text) {
        text = text.replace(/[^0-9.]+/g, '');

        if (text.length > 3) {
            text = text.substring(0, 3)
        }

        return text + ' Metros'
    }

    formatoCantidadUnidadesText(text) {
        text = text.replace(/[^0-9.]+/g, '');

        if (text.length > 3) {
            text = text.substring(0, 3)
        }

        return text + ' Unidades'
    }

}
