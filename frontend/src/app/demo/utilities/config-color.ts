import { Injectable } from '@angular/core';
import { PantoneColors } from './pantone-colors';

@Injectable()
export class ConfigColor {

    colors = this.PantoneColors.colorsBcp;
    public colorBase = '#001F5A';
    //   colors = this.PantoneColors.colorsCore;
    // public colorBase = '#42abe0';
    public resetColorToBase = this.colorBase;
    public contador: number = 0;
    public rowActual;
    public colorcapture = '';


    nameProject: string = "Polaris Core";

    constructor(public PantoneColors: PantoneColors) { }

    colorAleatorio() {


        let number = Math.floor(Math.random() * this.colors.length)
        return this.colors[number];
    }

    public sumaHexadecimal(hexadecimal) {

        const decimal = hexadecimal.toLowerCase().split('').reduce((result, ch) =>
            result * 16 + '0123456789abcdefgh'.indexOf(ch), 0);

        const sum = decimal + 16;

        const nunber = parseInt(sum);

        return nunber.toString(16).toUpperCase();

    }

    public colorExadecimal(rowscount) {
        if (this.contador <= rowscount) {
            const colorletra = this.resetColorToBase.split('');

            let r = colorletra[1].concat(colorletra[2]);

            let g = colorletra[3].concat(colorletra[4]);

            let b = colorletra[5].concat(colorletra[6]);

            r = this.sumaHexadecimal(r);
            if (r.length === 1) {
                r = '0' + r;
            } else if (r.length === 3) {
                r = 'FF';
            }
            g = this.sumaHexadecimal(g);
            if (g.length === 1) {
                g = '0' + g;
            } else if (g.length === 3) {
                g = 'FF';
            }
            b = this.sumaHexadecimal(b);
            if (b.length === 1) {
                b = '0' + b;
            } else if (b.length === 3) {
                b = 'FF';
            }

            const color = colorletra[0].concat(r, g, b);
            this.resetColorToBase = color;

            this.colorcapture = color;
        } else {
            this.colorcapture = '#FF0000';
        }
        this.contador = this.contador + 1;
        return this.colorcapture;
    }
    resetColor() {
        this.resetColorToBase = this.colorBase;
        this.contador = 0;
    }

}

