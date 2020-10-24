import { Injectable } from '@angular/core';
import { Adapter } from '../utilities/adapter';
import { UtilitiesConfigString } from '../utilities/utilities-config-string.service';

export class LoginModel {

    constructor(
        public usu_clave: number,
        public usu_login: string,
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class LoginModelAdapter implements Adapter<LoginModel> {

    constructor(private utilitiesString: UtilitiesConfigString) {
    }

    adaptList(list: any): LoginModel[] {
        let array: any = [];
        if (list.length > 0) {
            list.forEach(item => {
                array.push(new LoginModel(
                    item.usu_clave,
                    item.usu_login
                ));
            });
        }
        return array;
    }

    adaptObjectReceive(item: any): LoginModel {
        return new LoginModel(
            item.usu_clave,
            item.usu_login
        );
    }

    adaptObjectSend(item: any): any {
        let obj = {
            usu_clave: item.usu_clave,
            usu_login: item.usu_login
        };
        return obj
    }

    adaptListSend(list: any): any {
        let array: any = [];
        list.forEach(item => {
            array.push({
                usu_clave: item.usu_clave,
                usu_login: item.usu_login
            });
        });
        return array;
    }
}