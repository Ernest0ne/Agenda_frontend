export class Spare {
    public spar_id: string;
    public spar_code: string;
    public spar_terminal_model: string;
    public spar_name: string;
    public spar_status: string;
    public spar_quantity: string;
    public spar_date_register: string;
    public spar_register_by: string;
    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        spar_id = '',
        spar_terminal_model = '',
        spar_register_by = '',
        spar_code = '',
        spar_name = '',
        spar_status = '',
        spar_date_register = '',
        spar_quantity = ''
    ) {
        this.spar_id = spar_id;
        this.spar_code = spar_code;
        this.spar_terminal_model = spar_terminal_model;
        this.spar_name = spar_name;
        this.spar_status = spar_status;
        this.spar_quantity = spar_quantity;
        this.spar_date_register = spar_date_register;
        this.spar_register_by = spar_register_by;
    }
}
