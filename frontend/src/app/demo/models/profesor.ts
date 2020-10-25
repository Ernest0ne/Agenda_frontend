import { Injectable } from "@angular/core";
import { Adapter } from "../utilities/adapter";
import { UtilitiesConfigString } from "../utilities/utilities-config-string.service";

export class ProfesorModel {

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        public pro_id: string,
        public pro_nombre: string,
        public pro_apellido: string,
        public pro_correo: string,
        public pro_facultad: string,
        public pro_departamento: string,
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class ProfesorModelAdapter implements Adapter<ProfesorModel> {

    constructor(private utilitiesString: UtilitiesConfigString) {
    }

    adaptList(list: any): ProfesorModel[] {
        let array: any = [];
        if (list.length > 0) {
            list.forEach(item => {
                array.push(new ProfesorModel(
                    item.pro_id,
                    item.pro_nombre,
                    item.pro_apellido,
                    item.pro_correo,
                    item.pro_facultad,
                    item.pro_departamento
                ));
            });
        }
        return array;
    }

    adaptObjectReceive(item: any): ProfesorModel {
        return new ProfesorModel(
            item.pro_id,
            item.pro_nombre,
            item.pro_apellido,
            item.pro_correo,
            item.pro_facultad,
            item.pro_departamento
        );
    }

    adaptObjectSend(item: any): any {
        let obj = {
            pro_id: item.pro_id,
            pro_nombre: item.pro_nombre,
            pro_apellido: item.pro_apellido,
            pro_correo: item.pro_correo,
            pro_facultad: item.pro_facultad,
            pro_departamento: item.pro_departamento
        };
        return obj
    }

    adaptListSend(list: any): any {
        let array: any = [];
        list.forEach(item => {
            array.push({
                pro_id: item.pro_id,
                pro_nombre: item.pro_nombre,
                pro_apellido: item.pro_apellido,
                pro_correo: item.pro_correo,
                pro_facultad: item.pro_facultad,
                pro_departamento: item.pro_departamento
            });
        });
        return array;
    }
}