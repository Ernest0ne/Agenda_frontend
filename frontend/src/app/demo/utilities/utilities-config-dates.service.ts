/**
 * Este service contiene metodos para transformar objetos tipo DATE
 */

import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable()
export class UtilitiesConfigDates {

    /**
     * 
     * @param h_24 hora en formato 24, la retorna en formato 12h
     */
    formatTimeShow12h(h_24) {
        let array = h_24.split(':');
        var h = array[0] % 12;
        if (h === 0) h = 12;
        return h + ':' + array[1] + ' ' + (h_24 < 12 ? 'AM' : 'PM');
    }

    /**
     * 
     * @param date recibe una fecha (Date) y la retorna como hora con formato hh:mm:ss
     */
    convertDateToTime(date: Date) {
        return moment(date).format('HH:mm:ss');
    }

    convertTimeToDate(time): Date {
        const date = new Date();
        date.setHours(time.substring(0, 2));
        date.setMinutes(time.substring(3, 5));
        date.setSeconds(time.substring(6, 8));
        return date;
    }


    /**
     * 
     * @param date obtiene una fecha (Date) y devuelve un string con formato YYYY-MM-DD h:mm:ss
     */
    getDateWithFormat(date: Date): string {
        return moment(date).format('YYYY-MM-DD h:mm:ss');
    }

    /**
     * 
     * @param date obtiene una fecha (Date) y devuelve un string con formato YYYY-MM-DD 
     */
    getDateWithFormatWithourHours(date: Date): string {
        return moment(date).format('YYYY-MM-DD');
    }

    /**
     * 
     * @param date recibe un string de fecha y lo convierte a Date
     */
    getDate(date: any) {
        if (date == null) {
            return
        }
        let array = date.split('-');
        let dateSend = new Date();
        dateSend.setFullYear(array[0]);
        dateSend.setMonth(array[1] - 1);
        dateSend.setDate(array[2]);
        return dateSend;
    }

}