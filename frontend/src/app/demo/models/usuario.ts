import { Injectable } from "@angular/core";
import { Adapter } from "../utilities/adapter";
import { UtilitiesConfigString } from "../utilities/utilities-config-string.service";

export class UsuarioModel {

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        public usu_id: string,
        public usu_nombre: string,
        public usu_apellido: string,
        public usu_correo: string
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class UsuarioModelAdapter implements Adapter<UsuarioModel> {

    constructor(private utilitiesString: UtilitiesConfigString) {
    }

    adaptList(list: any): UsuarioModel[] {
        let array: any = [];
        if (list.length > 0) {
            list.forEach(item => {
                array.push(new UsuarioModel(
                    item.usu_id,
                    item.usu_nombre,
                    item.usu_apellido,
                    item.usu_correo
                ));
            });
        }
        return array;
    }

    adaptObjectReceive(item: any): UsuarioModel {
        return new UsuarioModel(
            item.usu_id,
            item.usu_nombre,
            item.usu_apellido,
            item.usu_correo
        );
    }

    adaptObjectSend(item: any): any {
        let obj = {
            usu_id: item.usu_id,
            usu_nombre: item.usu_nombre,
            usu_apellido: item.usu_apellido,
            usu_correo: item.usu_correo
        };
        return obj
    }

    adaptListSend(list: any): any {
        let array: any = [];
        list.forEach(item => {
            array.push({
                usu_id: item.usu_id,
                usu_nombre: item.usu_nombre,
                usu_apellido: item.usu_apellido,
                usu_correo: item.usu_correo
            });
        });
        return array;
    }
}