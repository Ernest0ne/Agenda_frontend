import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { AppComponent } from './app.component';
import { NotificationsService } from './demo/Services/notifications.service';
import { UserIdleService } from 'angular-user-idle';
import * as SecureLS from 'secure-ls';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { SokectIoService } from './demo/Services/sokect-io.service';
import { FuncionesGenerales } from './demo/Components/FuncionesGenerales/funcionesGenerales';

// importamos el servicio del empleado
import { UserService } from './demo/Services/user.service';
import { ignoreElements } from 'rxjs/operators';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService, MessageService]
})
export class AppTopBarComponent implements OnInit {
    ls = new SecureLS({ encodingType: 'aes' });
    notificaciones = [
        { noti_id: '', noti_msg: '', noti_state: '', noti_espe: '' }
    ];
    cargo = this.ls.get('user_cargo');
    notificacion;
    noti_length;
    active;
    intervalo;
    location = ''; // window.location;
    display = false;
    status = false;
    notificacionesSokect = [];
    documents: Observable<string[]>;
    currentDoc: string;
    private _docSub: Subscription;
    commercesNotLocation = [];
    mapLocation = true;
    commerceSelected = '';
    lng = 0;
    lat = 0;

    configuraciones;


    geoDist1 = '';
    geoDist2 = '';
    geoDist1Plural = '';
    geoDist2Plural = '';

    @Input()
    title: string;
    showTitleOrBreadcrumb: boolean;

    constructor(
        private sokectIoService: SokectIoService,
        private service: MessageService,
        public app: AppComponent,
        private confirmationService: ConfirmationService,
        private notificationsservice: NotificationsService,
        private userIdle: UserIdleService,
        public userService: UserService,
        private funcionesGenerales: FuncionesGenerales,
    ) { }

    ngOnInit() {

        //        this.cargarNotificaciones();
        /* this.recargarNotificaciones(); */
        this.validar_tiempo_sesion();
    }


    validar_tiempo_sesion() {
        if (this.ls.get('user_code')) {
            // Comienza a observar la inactividad del usuario.
            this.userIdle.startWatching();
            // Comienza a mirar cuando el usuario está inactivo
            this.userIdle.onTimerStart().subscribe(count => console.log(count));
            // Empezar a mirar cuando se acabe el tiempo
            this.userIdle.onTimeout().subscribe(() => {
                // console.log("sesión eliminada");
                this.logoutUser();
            });
        }
    }

    logoutUser() {

        this.sokectIoService.logout();
        this.ls.removeAll();
        this.ls.clear();
        localStorage.clear();
        this.ls = null;
        this.stop();
        this.stopWatching();
        location.href = '/#/';
        console.log(
            '************* sale por el apptoolbar *****************'
        );
    }

    actualizarNotificaciones(notificaciones) {
        if (this.notificaciones.length < notificaciones.length) {
            this.notificaciones = notificaciones.sort(this.compareDate);
            if (this.notificaciones.length > 0) {
                this.noti_length = this.notificaciones.length;
                this.formatNotifications();
            } else {
                this.notificaciones = [];
                this.noti_length = 0;
            }
            this.funcionesGenerales.showSuccessViaToast('Tiene una notificación nueva');
        }
    }

    cargarNotificaciones() {
        const code = this.ls.get('user_code');
        if (code) {
            this.notificationsservice.listarNotificacionesUsuario(code).subscribe(res => {
                if (res && res != undefined && res != null && JSON.stringify(res) != '{}') {
                    let notifications = [];
                    notifications = res as [];
                    this.notificaciones = notifications.sort(
                        this.compareDate
                    );
                    if (this.notificaciones.length > 0) {
                        this.noti_length = this.notificaciones.length;
                        this.formatNotifications();
                    } else {
                        this.notificaciones = [];
                        this.noti_length = 0;
                    }
                } else {
                    this.notificaciones = [];
                    this.noti_length = 0;
                }
            });
        }
    }

    formatNotifications() {
        this.notificaciones.forEach(element => {
            element.noti_espe = '';
            element['noti_show'] = false;
            element['noti_date_create'] = this.funcionesGenerales.formatearFecha(element['noti_date_create']);
            let ar = element.noti_msg.split('[');
            if (ar.length > 1) {
                const array = JSON.parse('[' + ar[1]);
                if (element['noti_type'] == 'Cargue masivo') {
                    element.noti_msg = ar[0];
                    element['noti_data'] = array;
                } else {
                    array.forEach(elementTwo => {
                        element.noti_msg = ar[0];
                        if (elementTwo.estado) {
                            element.noti_espe += '\n SERIAL: ' + elementTwo.serial + '\n, MARCA: ' + elementTwo.marca +
                                '\n, ESTADO: ' + elementTwo.estado;
                        } else if (elementTwo.marca) {
                            element.noti_espe += '\n MARCA: ' + elementTwo.marca + '\n, MODELO: ' + elementTwo.modelo +
                                '\n, SERIAL: ' + elementTwo.serial;
                        } else if (elementTwo.codigo) {
                            element.noti_espe += '\n CÓDIGO: ' + elementTwo.codigo + '\n, NOMBRE: ' + elementTwo.nombre +
                                '\n, CANTIDAD: ' + elementTwo.cantidad;
                        }
                        element.noti_espe += '<br/>';
                    });
                    element['noti_length'] = array.length;
                }
            } else {
                ar = element.noti_msg.split('{');
                element.noti_msg = ar[0];
                if (ar.length > 1) {
                    const data = JSON.parse('{' + ar[1]);
                    element.noti_espe += '\n MARCA: ' + data.marca +
                        '\n MODELO: ' + data.modelo + '\n SERIAL: ' + data.serial;
                }
                element['noti_length'] = 1;
            }
        });
    }

    compareDate(a, b) {
        const d2 = new Date(a['noti_date_create']);
        const d1 = new Date(b['noti_date_create']);
        return d1 === d2 ? 0 : d1 > d2 ? 1 : -1;
    }

    eliminarNotificacion(noti_id) {
        this.notificationsservice
            .deleteNotification(noti_id)
            .subscribe(data => {
                const liNotification = document.getElementById(
                    noti_id.toString()
                );
                liNotification.classList.add('deleted');
                this.cargarNotificaciones();
            });
    }

    verNotificacion(noti_id) {
        for (let i = 0; i < this.notificaciones.length; i++) {
            const itemN = this.notificaciones[i];
            if (noti_id === this.notificaciones[i].noti_id) {
                this.notificacion = itemN;
                this.notificationsservice
                    .updateNotification(itemN.noti_id)
                    .subscribe(data => { });

                this.confirmationService.confirm({
                    message: '¿Desea eliminar la notificación?',
                    accept: () => {
                        this.eliminarNotificacion(noti_id);
                    }
                });
            }
        }
    }

    recargarNotificaciones() {
        clearInterval(this.intervalo);
        this.intervalo = setInterval(res => {
            this.cargarNotificaciones();
        }, 60000);
    }

    clickPrev() {
        var element = document.querySelector(".btnPrev") as HTMLElement;
        console.log('...>', element);
        if (element != null) {
            element.click();
        }
    }

    exists() {
        var element = document.querySelector(".btnPrev") as HTMLElement;
        if (element != null) {
            return true;
        } else {
            return false;
        }
    }

    stop() {
        this.userIdle.stopTimer();
    }

    stopWatching() {
        this.userIdle.stopWatching();
    }

    startWatching() {
        this.userIdle.startWatching();
    }

    restart() {
        this.userIdle.resetTimer();
    }
    showLogo() {
        if (this.status) {
            this.status = false;
        } else {
            this.status = true;
        }
    }
}
