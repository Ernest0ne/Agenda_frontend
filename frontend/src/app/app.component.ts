import { Component, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { ScrollPanel } from 'primeng/primeng';
import { UserService } from '../app/demo/Services/user.service';
import { MessageService } from 'primeng/components/common/api';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as SecureLS from 'secure-ls';
import { SwUpdate } from '@angular/service-worker';
import { SokectIoService } from './demo/Services/sokect-io.service';
import { Title } from '@angular/platform-browser';
import { ConfigColor } from 'src/configColor';
import { BreadcrumbService } from './breadcrumb.service';
import { FuncionesGenerales } from './demo/Components/FuncionesGenerales/funcionesGenerales';
import { async } from 'q';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
    deviceInfo = null;
    layoutMode = 'static';

    darkMenu = true;

    profileMode = 'popup';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;
    showTitleOrBreadcrumb: boolean = false;

    grouped = true;
    display = false;
    pass = '';
    logueado = false;
    ls = new SecureLS({ encodingType: 'aes' });
    breadcrumbItems: any[];
    titleMobile = '';


    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ScrollPanel;

    constructor(private sokectIoService: SokectIoService, private service: MessageService,
        public userService: UserService, public renderer: Renderer2,
        private deviceService: DeviceDetectorService, updates: SwUpdate, private titleService: Title, private configColor: ConfigColor,
        public breadcrumbService: BreadcrumbService, private funcionesGenerales: FuncionesGenerales) {

        const name = Calendar.name;

        updates.available.subscribe(event => {
            updates.activateUpdate().then(() => document.location.reload());
        });

        this.titleService.setTitle(this.configColor.nameProject);

        this.connectSocket();
        // window.addEventListener('beforeunload', (e) => {
        //     const confirmationMessage = '\o/';
        //     (e || window.event).returnValue = confirmationMessage;     // Gecko + IE
        //     return confirmationMessage;                                // Webkit, Safari, Chrome etc.
        // });

        // window.addEventListener('unload', () => {
        //     const body = {
        //         user_identification: this.ls.get('id'),
        //         user_session: '0'
        //     };
        //     this.userService.updateSession(body).subscribe(res => { });
        // });

        this.contarTiempoEnSesion();
        if (this.ls.get('recargar')) {
            this.mostarMenu();
        }

        this.epicFunction();
    }

    ngOnDestroy() {

    }

    connectSocket() {
        if (this.ls.get('user_code') != null && this.ls.get('user_code') != '' && this.ls.get('user_code') != undefined && this.ls.get('user_code') != ' ') {
            this.sokectIoService.connectionSuscribe(this.ls.get('user_code'));
        }
    }

    epicFunction() {
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();
        const isDesktopDevice = this.deviceService.isDesktop();
        const body = document.getElementsByTagName('body');
        if (isMobile) {
            body[0].classList.add('movil');
        } else if (isTablet) {
            body[0].classList.add('tablet');
        } else {
            body[0].classList.add('desktop');
        }
    }


    contarTiempoEnSesion() {
        const intervalo = setInterval(async (res) => {
            const dateAct = new Date();
            const tiempo = await this.calcularHora(this.ls.get('hora_inicio'), dateAct.getHours() + '-' + dateAct.getMinutes());
            if (tiempo >= 4) {
                this.display = true;
                clearInterval(intervalo);
            }
        }, 60000);
    }

    calcularHora(horaInicio, horaActual) {
        if (horaInicio == null && horaInicio == undefined) {
            return 0;
        }
        const hi = horaInicio.split('-');
        const ha = horaActual.split('-');
        if (parseInt(ha[0]) < parseInt(hi[0])) {
            return 4;
        }
        const horas = (parseInt(ha[0]) - parseInt(hi[0]));
        const minutos = (horas - 1) * 60;
        const mi = 60 - parseInt(hi[1]);
        const minTotal = minutos + mi + parseInt(ha[1]);
        return (minTotal / 60);
    }
    mostarMenu() {
        setTimeout(() => {
            this.logueado = true;
        }, 50);
    }
    ocultarMenu() {
        setTimeout(() => {
            this.logueado = false;
            const app_topbar_menu = document.querySelector('.layout-menu-dark');
            app_topbar_menu.classList.remove('layout-static-inactive');
        }, 50);
    }

    onLayoutClick(event) {
        const long = event.path.filter(c => c.id == 'notification' || c.tagName == 'P-CONFIRMDIALOG' || c.tagName == 'P-DIALOG' || c.className == 'content-notification' || c.id == 'bread-crumb');
        if (!this.topbarItemClick && long.length == 0) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
            this.showTitleOrBreadcrumb = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === 'overlay' && !this.isMobile()) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (!this.isHorizontal()) {
            setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 450);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        // this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = true;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.layoutMode === 'slim';
    }

    isStatic() {
        return this.layoutMode === 'static';
    }



    setTitleMobile(title) {
        this.titleMobile = title;
    }

    showMobileTitle(flag) {
        this.showTitleOrBreadcrumb = flag;
    }

    chargeBreadcrum(codeItemMenu, ids) {
        this.breadcrumbItems = [];
        if (codeItemMenu) {
            switch (codeItemMenu) {
                case 'GESTION_DE_BODEGAS':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión de Bodegas',
                        routerLink: '/polarisCore/GestiondeBodegas'
                    });
                    break;
                case 'GESTION_DE_EXTRAS':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión de Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_ACCESORIOS':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado de Accesorios',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_PERMISOS':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado de Permisos',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_CIUDADES':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Ciudades',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_MARCAS_TERMINAL':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Marcas De Terminal',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_MODELOS_TERMINAL':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Modelos De Terminal',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_PAISES':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado de Paises',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_CIUDADES_POR_USUARIO':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Ciudades Por Usuario',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_PRODUCTIVIDAD':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Productividad',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_REPUESTOS':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Repuestos',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_SIM_CARD':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De SIM CARD',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_TERMINALES':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Terminales',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_TIPIFICACIONES':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Tipificaciones',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'LISTADO_DE_COMERCIOS':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Extras',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    this.breadcrumbItems.push({
                        label: 'Listado De Comercios',
                        routerLink: '/polarisCore/GestiondeExtras'
                    });
                    break;
                case 'AUDITORIA':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Auditoría',
                        routerLink: '/polarisCore/Auditoria'
                    });
                    break;
                case 'CARGUE_MASIVO':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Cargue De Base De Datos',
                        routerLink: '/polarisCore/Cargaenbasededatos'
                    });
                    break;
                case 'GESTION_DE_USUARIOS':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Usuarios',
                        routerLink: '/polarisCore/GestiondeUsuarios'
                    });
                    break;
                case 'GESTION_DE_ROLES_ACTUALIZAR':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Roles',
                        routerLink: '/polarisCore/GestiondeRoles/Actualizar'
                    });
                    this.breadcrumbItems.push({
                        label: 'Actualizar',
                        routerLink: '/polarisCore/GestiondeRoles/Actualizar'
                    });
                    break;
                case 'GESTION_DE_ROLES_REGISTRAR':
                    this.breadcrumbItems.push({
                        label: 'Configuracion y Administración',
                    });
                    this.breadcrumbItems.push({
                        label: 'Gestión De Roles',
                        routerLink: '/polarisCore/GestiondeRoles/Registrar'
                    });
                    this.breadcrumbItems.push({
                        label: 'Registrar',
                        routerLink: '/polarisCore/GestiondeRoles/Registrar'
                    });
                    break;
                case 'CREAR_INCIDENCIAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Crear Incidencias',
                        routerLink: '/polarisCore/CrearIncidencia'
                    });
                    break;
                case 'VALIDACION_REQUERIDA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Validación Requerida',
                        routerLink: '/polarisCore/ValidacionRequerida'
                    });
                    break;
                case 'VALIDACION_REQUERIDA_DETALLE_INCIDENCIA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Validación Requerida',
                        routerLink: '/polarisCore/ValidacionRequerida'
                    });
                    this.breadcrumbItems.push({
                        label: 'Detalle De Incidencia',
                        routerLink: '/polarisCore/ValidacionRequerida'
                    });
                    break;
                case 'REVISAR_INCIDENCIA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Revisar Incidencia',
                        routerLink: '/polarisCore/RevisarIncidencia'
                    });
                    break
                case 'REVISAR_DETALLE_INCIDENCIA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Revisar Incidencia',
                        routerLink: '/polarisCore/RevisarIncidencia'
                    });
                    this.breadcrumbItems.push({
                        label: 'Detalle de Incidencia',
                        routerLink: '/polarisCore/RevisarIncidencia/Revisar/' + ids
                    });
                    break;
                case 'TIEMPOS_DE_ATENCION':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Tiempos De Atención',
                        routerLink: '/polarisCore/TiemposdeAtencion'
                    });
                    break;
                case 'ACTUALIZAR_INCIDENCIAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Actualizar Incidencias',
                        routerLink: '/polarisCore/ActualizarIncidencia'
                    });
                    break;
                case 'DETALLES_ACTUALIZAR_INCIDENCIAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Actualizar Incidencias',
                        routerLink: '/polarisCore/ActualizarIncidencia'
                    });
                    this.breadcrumbItems.push({
                        label: 'Detalle De Incidencias',
                        routerLink: '/polarisCore/ActualizarIncidencia/Actualizar/' + ids
                    });
                    break;
                case 'ASIGNAR_INCIDENCIAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Asignar Incidencias',
                        routerLink: '/polarisCore/AsignarIncidencia'
                    });
                    break;
                case 'REABRIR_INCIDENCIAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Re Abrir Incidencias',
                        routerLink: '/polarisCore/ReAbrirIncidencia'
                    });
                    break;
                case 'REPORTE_INCIDENCIAS_TIPIFICACIÓN_DE_FALLAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reporte De Incidencias',
                        routerLink: '/polarisCore/Reportesdeincidencias/Tipificacindefallas'
                    });
                    this.breadcrumbItems.push({
                        label: 'Tipificación De Fallas',
                        routerLink: '/polarisCore/Reportesdeincidencias/Tipificacindefallas'
                    });
                    break;
                case 'REPORTE_INCIDENCIAS_ATENCION_COMERCIO_ANS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reporte De Incidencias',
                        routerLink: '/polarisCore/Reportesdeincidencias/AtencincomercioANS'
                    });
                    this.breadcrumbItems.push({
                        label: 'Atención Comercio ANS',
                        routerLink: '/polarisCore/Reportesdeincidencias/AtencincomercioANS'
                    });
                    break;
                case 'REPORTE_INCIDENCIAS_POR_COMERCIO':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reporte De Incidencias',
                        routerLink: '/polarisCore/Reportesdeincidencias/Incidenciaporcomercio'
                    });
                    this.breadcrumbItems.push({
                        label: 'Incidencias Por Comercio',
                        routerLink: '/polarisCore/Reportesdeincidencias/Incidenciaporcomercio'
                    });
                    break;
                case 'REPORTE_INCIDENCIAS_CERRADAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reporte De Incidencias',
                        routerLink: '/polarisCore/Reportesdeincidencias/Incidenciascerradas'
                    });
                    this.breadcrumbItems.push({
                        label: 'Incidencias Cerradas',
                        routerLink: '/polarisCore/Reportesdeincidencias/Incidenciascerradas'
                    });
                    break;
                case 'VISUALIZACION_INCIDENCIAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Visualización De Incidencias',
                        routerLink: '/polarisCore/VisualizaciondeIncidencias'
                    });
                    break;
                case 'VISUALIZACION_DETALLE_INCIDENCIAS_VER':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Visualización De Incidencias',
                        routerLink: '/polarisCore/VisualizaciondeIncidencias'
                    });
                    this.breadcrumbItems.push({
                        label: 'Detalle De Incidencia',
                        routerLink: '/polarisCore/VisualizaciondeIncidencias/Ver/' + ids
                    });
                    break;
                case 'VISUALIZACION_DETALLE_INCIDENCIAS_VER_INCIDENCIA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Visualización De Incidencias',
                        routerLink: '/polarisCore/VisualizaciondeIncidencias'
                    });
                    this.breadcrumbItems.push({
                        label: 'Detalle De Incidencia',
                        routerLink: '/polarisCore/VisualizaciondeIncidencias/VerIncidencia/' + ids
                    });
                    break;
                case 'ASIGNAR_TAT':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Asignar TAT',
                        routerLink: '/polarisCore/AsignarTAT'
                    });
                    break;
                case 'REPORTES_CAMPO_GEOLOCALIZACION_TECNICO':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes Gestion En Campo',
                        routerLink: '/polarisCore/Reportesgestionencampo/Geolocalizacintcnico'
                    });
                    this.breadcrumbItems.push({
                        label: 'Geolocalización Técnico',
                        routerLink: '/polarisCore/Reportesgestionencampo/Geolocalizacintcnico'
                    });
                    break;
                case 'REPORTES_CAMPO_RANKING_TECNICOS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes Gestion En Campo',
                        routerLink: '/polarisCore/Reportesgestionencampo/Rankingsdetcnicos'
                    });
                    this.breadcrumbItems.push({
                        label: 'Ranking De Técnicos',
                        routerLink: '/polarisCore/Reportesgestionencampo/Rankingsdetcnicos'
                    });
                    break;
                case 'REPORTES_CAMPO_RUTA_STOCK_TECNICOS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes Gestion En Campo',
                        routerLink: '/polarisCore/Reportesgestionencampo/Rutastocktcnicos'
                    });
                    this.breadcrumbItems.push({
                        label: 'Ruta Y Stock De Técnicos',
                        routerLink: '/polarisCore/Reportesgestionencampo/Rutastocktcnicos'
                    });
                    break;
                case 'REPORTES_CAMPO_ESTADISTICAS_TECNICOS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Incidencias',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes Gestion En Campo',
                        routerLink: '/polarisCore/Reportesgestionencampo/Estadsticasdetcnicos'
                    });
                    this.breadcrumbItems.push({
                        label: 'Estadísticas De Técnicos',
                        routerLink: '/polarisCore/Reportesgestionencampo/Estadsticasdetcnicos'
                    });
                    break;
                case 'TERMINALES_DAR_DE_BAJA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Terminales',
                        routerLink: '/polarisCore/GestiondeTerminales/DardeBaja'
                    });
                    this.breadcrumbItems.push({
                        label: 'Dar De Baja',
                        routerLink: '/polarisCore/GestiondeTerminales/DardeBaja'
                    });
                    break;
                case 'TERMINALES_ALTA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Terminales',
                        routerLink: '/polarisCore/GestiondeTerminales/Alta'
                    });
                    this.breadcrumbItems.push({
                        label: 'Alta',
                        routerLink: '/polarisCore/GestiondeTerminales/Alta'
                    });
                    break;
                case 'TERMINALES_ACTUALIZAR':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Terminales',
                        routerLink: '/polarisCore/GestiondeTerminales/Actualizar'
                    });
                    this.breadcrumbItems.push({
                        label: 'Actualizar',
                        routerLink: '/polarisCore/GestiondeTerminales/Actualizar'
                    });
                    break;
                case 'TERMINALES_ASIGNAR_TSA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Terminales',
                        routerLink: '/polarisCore/GestiondeTerminales/AsignarTSA'
                    });
                    this.breadcrumbItems.push({
                        label: 'Asignar TSA',
                        routerLink: '/polarisCore/GestiondeTerminales/AsignarTSA'
                    });
                    break;
                case 'ALBARAN_CREAR':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Albarán',
                        routerLink: '/polarisCore/GestiondeAlbaran/Crear'
                    });
                    this.breadcrumbItems.push({
                        label: 'Crear',
                        routerLink: '/polarisCore/GestiondeAlbaran/Crear'
                    });
                    break;
                case 'ALBARAN_RECIBIR':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Albarán',
                        routerLink: '/polarisCore/GestiondeAlbaran/Recibir'
                    });
                    this.breadcrumbItems.push({
                        label: 'Recibir',
                        routerLink: '/polarisCore/GestiondeAlbaran/Recibir'
                    });
                    break;
                case 'ALBARAN_RECIBIR_DETALLES':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Albarán',
                        routerLink: '/polarisCore/GestiondeAlbaran/Recibir'
                    });
                    this.breadcrumbItems.push({
                        label: 'Recibir',
                        routerLink: '/polarisCore/GestiondeAlbaran/Recibir'
                    });
                    this.breadcrumbItems.push({
                        label: 'Detalle De Recibido',
                        routerLink: '/polarisCore/GestiondeAlbaran/Recibir/' + ids
                    });
                    break;
                case 'ALBARAN_BUSCAR':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Albarán',
                        routerLink: '/polarisCore/GestiondeAlbaran/Buscar'
                    });
                    this.breadcrumbItems.push({
                        label: 'Buscar',
                        routerLink: '/polarisCore/GestiondeAlbaran/Buscar'
                    });
                    break;
                case 'ALBARAN_BUSCAR_DETALLES':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Albarán',
                        routerLink: '/polarisCore/GestiondeAlbaran/Buscar'
                    });
                    this.breadcrumbItems.push({
                        label: 'Buscar',
                        routerLink: '/polarisCore/GestiondeAlbaran/Buscar'
                    });
                    this.breadcrumbItems.push({
                        label: 'Detalles',
                        routerLink: '/polarisCore/GestiondeAlbaran/Crear/' + ids
                    });
                    break;
                case 'STOCK_BODEGA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes De Inventario',
                        routerLink: '/polarisCore/Reportesdeinventario/Stockdebodega'
                    });
                    this.breadcrumbItems.push({
                        label: 'Stock De Bodega',
                        routerLink: '/polarisCore/Reportesdeinventario/Stockdebodega'
                    });
                    break;
                case 'HISTORICO_MOVIMIENTOS_TERMINAL':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Inventario',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes De Inventario',
                        routerLink: '/polarisCore/Reportesdeinventario/Histricodemovimiento'
                    });
                    this.breadcrumbItems.push({
                        label: 'Histórico De Movimientos De Terminal',
                        routerLink: '/polarisCore/Reportesdeinventario/Histricodemovimiento'
                    });
                    break;
                case 'LABORATORIO_ASIGNAR_TSR':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Asignar TSR',
                        routerLink: '/polarisCore/AsignarTSR'
                    });
                    break;
                case 'LABORATORIO_VISTA_GENERAL':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Vista General',
                        routerLink: '/polarisCore/ControldeTerminales'
                    });
                    break;
                case 'LABORATORIO_COTIZACION':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio / Control De Terminales',
                    });
                    this.breadcrumbItems.push({
                        label: 'Cotización',
                        routerLink: '/polarisCore/ControldeTerminales'
                    });
                    break;
                case 'LABORATORIO_GARANTIA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio / Control De Terminales',
                    });
                    this.breadcrumbItems.push({
                        label: 'Garantía',
                        routerLink: '/polarisCore/ControldeTerminales'
                    });
                    break;
                case 'LABORATORIO_POSIBLE_DADO_BAJA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio / Control De Terminales',
                    });
                    this.breadcrumbItems.push({
                        label: 'Posible dado de baja',
                        routerLink: '/polarisCore/ControldeTerminales'
                    });
                    break;
                case 'LABORATORIO_ALERTA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio / Control De Terminales',
                    });
                    this.breadcrumbItems.push({
                        label: 'Alerta',
                        routerLink: '/polarisCore/ControldeTerminales'
                    });
                    break;
                case 'LABORATORIO_QA':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio / Control De Terminales',
                    });
                    this.breadcrumbItems.push({
                        label: 'QA',
                        routerLink: '/polarisCore/ControldeTerminales'
                    });
                    break;
                case 'LABORATORIO_TIPIFICACION_FALLAS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes De Laboratorio',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Tipificacindefallas'
                    });
                    this.breadcrumbItems.push({
                        label: 'Tipificación De Fallas',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Tipificacindefallas'
                    });
                    break;
                case 'LABORATORIO_RANKING_TECNICOS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes De Laboratorio',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Rankingdetcnicos'
                    });
                    this.breadcrumbItems.push({
                        label: 'Ranking De Técnicos',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Rankingdetcnicos'
                    });
                    break;
                case 'LABORATORIO_STOCK':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes De Laboratorio',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Stockdelaboratorio'
                    });
                    this.breadcrumbItems.push({
                        label: 'Stock De Laboratorio',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Stockdelaboratorio'
                    });
                    break;
                case 'LABORATORIO_TIEMPOS':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Tiempos De Laboratorio',
                        routerLink: '/polarisCore/TiempoparaLaboratorio'
                    });
                    break;
                case 'LABORATORIO_FALLAS_POR_MODELO':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes De Laboratorio',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Fallasmodelodeterminales'
                    });
                    this.breadcrumbItems.push({
                        label: 'Fallas De Modelos De Terminales',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Fallasmodelodeterminales'
                    });
                    break;
                case 'HISTORIA_CLINICA_TERMINALES':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Reportes De Laboratorio',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Historiaclnica'
                    });
                    this.breadcrumbItems.push({
                        label: 'Historia Clinica De Terminales',
                        routerLink: '/polarisCore/Reportesdelaboratorio/Historiaclnica'
                    });
                    break;
                case 'ASIGNAR_TCB':
                    this.breadcrumbItems.push({
                        label: 'Gestión De Laboratorio',
                    });
                    this.breadcrumbItems.push({
                        label: 'Asignar TCB',
                        routerLink: '/polarisCore/AsignarTCB'
                    });
                    break;
            }
        }
        this.breadcrumbService.setItems(this.breadcrumbItems);
    }

    controllerMove(event, open) {
        console.log('++++', event);
        if (open) {
            this.onMenuButtonClick(event);
        }
    }

}
