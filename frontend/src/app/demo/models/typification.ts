export class Typification {
    tyin_id: string;
    tyin_name: string;
    tyin_type: string;
    tyin_date_register: string;
    tyin_register_by: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        tyin_id = '',
        tyin_name = '',
        tyin_type = '',
        tyin_date_register = '',
        tyin_register_by = ''
    ) {
        this.tyin_id = tyin_id;
        this.tyin_name = tyin_name;
        this.tyin_type = tyin_type;
        this.tyin_date_register = tyin_date_register;
        this.tyin_register_by = tyin_register_by;
    }
}
