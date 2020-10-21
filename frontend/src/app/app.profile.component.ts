import { Component, OnInit } from '@angular/core';
import {
    trigger,
    state,
    transition,
    style,
    animate
} from '@angular/animations';
import { environment } from '../../src/environments/environment';
import * as SecureLS from 'secure-ls';

@Component({
    selector: 'app-inline-profile',
    templateUrl: './app.profile.component.html',
    animations: [
        trigger('menu', [
            state(
                'hidden',
                style({
                    height: '0px'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition(
                'visible => hidden',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hidden => visible',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            )
        ])
    ]
})
export class AppProfileComponent implements OnInit {
    readonly URL_API = environment.url;
    active: boolean;
    nombre = 'Hola';
    codigo = 'daQuin';
    ls = new SecureLS({ encodingType: 'aes' });
    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
    ngOnInit() {
    }
}
