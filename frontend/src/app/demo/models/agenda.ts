import { Injectable } from "@angular/core";
import { Adapter } from "../utilities/adapter";
import { UtilitiesConfigString } from "../utilities/utilities-config-string.service";

export class AgendaModel {

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        public age_id: string,
        public age_nombre: string,
        public age_descripcion: string
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class AgendaModelAdapter implements Adapter<AgendaModel> {

    constructor(private utilitiesString: UtilitiesConfigString) {
    }

    adaptList(list: any): AgendaModel[] {
        let array: any = [];
        if (list.length > 0) {
            list.forEach(item => {
                array.push(new AgendaModel(
                    item.age_id,
                    item.age_nombre,
                    item.age_descripcion
                ));
            });
        }
        return array;
    }

    adaptObjectReceive(item: any): AgendaModel {
        return new AgendaModel(
            item.age_id,
            item.age_nombre,
            item.age_descripcion
        );
    }

    adaptObjectSend(item: any): any {
        let obj = {
            age_id: item.age_id,
            age_nombre: item.age_nombre,
            age_descripcion: item.age_descripcion
        };
        return obj
    }

    adaptListSend(list: any): any {
        let array: any = [];
        list.forEach(item => {
            array.push({
                age_id: item.age_id,
                age_nombre: item.age_nombre,
                age_descripcion: item.age_descripcion
            });
        });
        return array;
    }
}