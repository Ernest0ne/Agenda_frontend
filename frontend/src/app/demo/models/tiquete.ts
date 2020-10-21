export class Tiquete {
    tiq_id: string;
    tiq_codigo: string;
    tiq_color: string;
    tiq_estado: string;
    tiq_fecha_creacion: string;
    tiq_material: string;
    tiq_observaciones: string;
    tiq_pares: string;
    tiq_planta: string;
    tiq_referencia: string;
    tiq_tallas: string;
    tiq_cliente_id: string;
    tiq_cliente_nombre: string;
    tiq_multiplicador: string;


    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        tiq_id = '',
        tiq_codigo = '',
        tiq_color = '',
        tiq_estado = '',
        tiq_fecha_creacion = '',
        tiq_material = '',
        tiq_observaciones = '',
        tiq_pares = '',
        tiq_planta = '',
        tiq_referencia = '',
        tiq_tallas = '',
        tiq_cliente_id = '',
        tiq_cliente_nombre = '',
        tiq_multiplicador = ''
    ) {
        this.tiq_id = tiq_id;
        this.tiq_codigo = tiq_codigo;
        this.tiq_color = tiq_color;
        this.tiq_estado = tiq_estado;
        this.tiq_fecha_creacion = tiq_fecha_creacion;
        this.tiq_material = tiq_material;
        this.tiq_observaciones = tiq_observaciones;
        this.tiq_pares = tiq_pares;
        this.tiq_planta = tiq_planta;
        this.tiq_referencia = tiq_referencia;
        this.tiq_tallas = tiq_tallas;
        this.tiq_cliente_id = tiq_cliente_id;
        this.tiq_cliente_nombre = tiq_cliente_nombre;
        this.tiq_multiplicador = tiq_multiplicador;
    }
}
