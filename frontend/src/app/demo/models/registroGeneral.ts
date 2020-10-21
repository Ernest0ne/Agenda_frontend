export class RegistroGeneral {
    rege_id: string;
    rege_tipo: string;
    rege_nombre: string;
    rege_fecha_registro: string;
    prere_cortada: string;
    prere_guarnicion: string;
    prere_montada: string;
    prere_limpiada: string;


    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        rege_id = '',
        rege_tipo= '',
        rege_nombre= '',
        rege_fecha_registro= '',
        prere_cortada = '',
        prere_guarnicion= '',
        prere_montada= '',
        prere_limpiada= ''
    ) {
        this.rege_fecha_registro = rege_fecha_registro;
        this.rege_id = rege_id;
        this.rege_nombre = rege_nombre;
        this.rege_tipo = rege_tipo;
        this.prere_cortada = prere_cortada;
        this.prere_guarnicion = prere_guarnicion;
        this.prere_montada = prere_montada;
        this.prere_limpiada = prere_limpiada;
    }
}