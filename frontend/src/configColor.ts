import { Injectable } from '@angular/core';
@Injectable()
export class ConfigColor {

    colors = [
        '#042123',//Dashboard
        '#084246',//Dashboard
        '#036369',
        '#10848c',
        '#15a5af',
        '#19c6d2', // Dashboard
        '#2cdae6',
        '#4fe0ea',
        '#72e6ee',
        '#95ecf3',

        '#b8f3f7', // background ranking technical
        '#dbf9fb',
        '#028D9E', //background grafic find-incidence-check, find-incidence, validation-required, Dashboard
        '#698386', //background grafic find-incidence-check, find-incidence, Dashboard
        '#074047', //Hover grafic find-incidence-check, find-incidence, validation-required
        '#0B6874', //Hover grafic find-incidence-check, find-incidence, validation-required, Dashboard
        '#06B9CF', //background grafic commercial-attention, validation-required, Dashboard
        '#16DCF4', //background grafic commercial-attention, Dashboard
        '#81D3DD',  //background grafic commercial-attention, Dashboard
        '#021011',

        '#063134',
        '#0a5257',
        '#0e737a',
        '#13949d',
        '#17b5c1', // background ranking technical
        '#1bd6e4',
        '#3ddde8',
        '#60e3ec',
        '#84e9f0',
        '#a7eff5',

        '#caf6f9',
        '#edfcfd',
        '#dee0e0',
        '#3F3F3F', // Dashboard
        '#CFD0D0', // Dashboard
        '#BFD9DC', // Dashboard
        '#A5ACAD'  // Dashboard
    ];

    nameProject: string = "AgendApp";

    constructor() { }

    colorAleatorio() {
        let number = Math.floor(Math.random() * this.colors.length)
        return this.colors[number];
    }

}

