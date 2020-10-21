export class Modelo {
    mod_id: string;
    mod_nombre: string;
    mod_planta_id: string;
    mod_referencia_id: string;
    mod_planta_nombre: string;
    mod_referencia_nombre: string;
    mod_materiales: any[];



    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        mod_id = '',
        mod_nombre= '',
        mod_planta_id= '',
        mod_referencia_id= '',
        mod_planta_nombre= '',
        mod_referencia_nombre= '',
        mod_materiales= [],
    ) {
        this.mod_id = mod_id;
        this.mod_nombre = mod_nombre;
        this.mod_planta_id = mod_planta_id;
        this.mod_referencia_id = mod_referencia_id;
        this.mod_planta_nombre = mod_planta_nombre;
        this.mod_referencia_nombre = mod_referencia_nombre;
        this.mod_materiales = mod_materiales;
    }
}