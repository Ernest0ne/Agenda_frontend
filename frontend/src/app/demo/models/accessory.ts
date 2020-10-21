export class Accessory {
    public acce_id: string;
    public acce_code: string;
    public acce_terminal_model: string;
    public acce_name: string;
    public acce_status: string;
    public acce_quantity: string;
    public acce_date_register: string;
    public acce_register_by: string;
    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        acce_id = '',
        acce_terminal_model = '',
        acce_register_by = '',
        acce_code = '',
        acce_name = '',
        acce_status = '',
        acce_date_register = '',
        acce_quantity = ''
    ) {
        this.acce_id = acce_id;
        this.acce_code = acce_code;
        this.acce_terminal_model = acce_terminal_model;
        this.acce_name = acce_name;
        this.acce_status = acce_status;
        this.acce_quantity = acce_quantity;
        this.acce_date_register = acce_date_register;
        this.acce_register_by = acce_register_by;
    }
}
