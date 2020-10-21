import { AppComponent } from '../../app.component';
import { Component, OnInit } from '@angular/core';


@Component({
    templateUrl: './access.component.html'
})
export class AccessComponent implements OnInit {
    constructor(private funciones: AppComponent) { }

    ngOnInit() {
        this.funciones.ocultarMenu();
        window.location.hash = 'no-back-button';
        window.location.hash = 'Again-No-back-button' // chrome
    }

    eliminarClass() {
    this.funciones.mostarMenu();
        document.location.href = '/#/Shoes';
    }
}


