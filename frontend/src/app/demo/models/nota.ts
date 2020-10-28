import { Injectable } from "@angular/core";
import { Adapter } from "../utilities/adapter";
import { UtilitiesConfigString } from "../utilities/utilities-config-string.service";

export class NotaModel {

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        public not_id: string,
        public not_nombre: string,
        public not_descripcion: string
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class NotaModelAdapter implements Adapter<NotaModel> {

    constructor(private utilitiesString: UtilitiesConfigString) {
    }

    adaptList(list: any): NotaModel[] {
        let array: any = [];
        if (list.length > 0) {
            list.forEach(item => {
                array.push(new NotaModel(
                    item.not_id,
                    item.not_nombre,
                    item.not_descripcion
                ));
            });
        }
        return array;
    }

    adaptObjectReceive(item: any): NotaModel {
        return new NotaModel(
            item.not_id,
            item.not_nombre,
            item.not_descripcion
        );
    }

    adaptObjectSend(item: any): any {
        let obj = {
            not_id: item.not_id,
            not_nombre: item.not_nombre,
            not_descripcion: item.not_descripcion
        };
        return obj
    }

    adaptListSend(list: any): any {
        let array: any = [];
        list.forEach(item => {
            array.push({
                not_id: item.not_id,
                not_nombre: item.not_nombre,
                not_descripcion: item.not_descripcion
            });
        });
        return array;
    }
}