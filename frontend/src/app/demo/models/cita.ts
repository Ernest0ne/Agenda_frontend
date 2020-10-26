import { Injectable } from "@angular/core";
import { Adapter } from "../utilities/adapter";
import { UtilitiesConfigString } from "../utilities/utilities-config-string.service";

export class CitaModel {

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        public cit_id: string,
        public cit_nombre: string,
        public cit_descripcion: string,
        public cit_estado: string,
        public cit_fecha_agendada: string,
        public cit_comentario: string,
        public cit_agenda: string,
        public cit_profesores: string,
        public cit_hora_fin: string,
        public cit_hora_inicio: string,
        public cit_lugar: string,
        public cit_calificacion: string,
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class CitaModelAdapter implements Adapter<CitaModel> {

    constructor(private utilitiesString: UtilitiesConfigString) {
    }

    adaptList(list: any): CitaModel[] {
        let array: any = [];
        if (list.length > 0) {
            list.forEach(item => {
                array.push(new CitaModel(
                    item.cit_id,
                    item.cit_nombre,
                    item.cit_descripcion,
                    item.cit_estado,
                    item.cit_fecha_agendada,
                    item.cit_comentario,
                    item.cit_agenda,
                    item.cit_profesores,
                    item.cit_hora_fin,
                    item.cit_hora_inicio,
                    item.cit_lugar,
                    item.cit_calificacion,
                ));
            });
        }
        return array;
    }

    adaptObjectReceive(item: any): CitaModel {
        return new CitaModel(
            item.cit_id,
            item.cit_nombre,
            item.cit_descripcion,
            item.cit_estado,
            item.cit_fecha_agendada,
            item.cit_comentario,
            item.cit_agenda,
            item.cit_profesores,
            item.cit_hora_fin,
            item.cit_hora_inicio,
            item.cit_lugar,
            item.cit_calificacion,
        );
    }

    adaptObjectSend(item: any): any {
        let obj = {
            cit_id: item.cit_id,
            cit_nombre: item.cit_nombre,
            cit_descripcion: item.cit_descripcion,
            cit_estado: item.cit_estado,
            cit_fecha_agendada: item.cit_fecha_agendada,
            cit_comentario: item.cit_comentario,
            cit_agenda: item.cit_agenda,
            cit_profesores: item.cit_profesores,
            cit_hora_fin: item.cit_hora_fin,
            cit_hora_inicio: item.cit_hora_inicio,
            cit_lugar: item.cit_lugar,
            cit_calificacion: item.cit_calificacion
        };
        return obj
    }

    adaptListSend(list: any): any {
        let array: any = [];
        list.forEach(item => {
            array.push({
                cit_id: item.cit_id,
                cit_nombre: item.cit_nombre,
                cit_descripcion: item.cit_descripcion,
                cit_estado: item.cit_estado,
                cit_fecha_agendada: item.cit_fecha_agendada,
                cit_comentario: item.cit_comentario,
                cit_agenda: item.cit_agenda,
                cit_profesores: item.cit_profesores,
                cit_hora_fin: item.cit_hora_fin,
                cit_hora_inicio: item.cit_hora_inicio,
                cit_lugar: item.cit_lugar,
                cit_calificacion: item.cit_calificacion
            });
        });
        return array;
    }
}