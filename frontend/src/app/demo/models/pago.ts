export class Pago {
    pag_id: string;
    pag_area: string;
    pag_empleado: {};
    pag_fecha: string;
    pag_tiquetes: string;
    pag_valor_pago: string;
    pag_cantidad_tiquetes: string;



    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        pag_id = '',
        pag_area = '',
        pag_empleado = {},
        pag_fecha = '',
        pag_tiquetes = '',
        pag_valor_pago = '',
        pag_cantidad_tiquetes = '',
    ) {
        this.pag_id = pag_id;
        this.pag_area = pag_area;
        this.pag_empleado = pag_empleado;
        this.pag_fecha = pag_fecha;
        this.pag_tiquetes = pag_tiquetes;
        this.pag_valor_pago = pag_valor_pago;
        this.pag_cantidad_tiquetes = pag_cantidad_tiquetes;
    }
}