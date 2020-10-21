export class Audit {
    public audi_id: string;
    public audi_action: string;
    public audi_after: string;
    public audi_before: string;
    public audi_client: string;
    public audi_date: string;
    public audi_ip: string;
    public audi_user: string;
    public audi_view: string;
    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        audi_id = '',
        audi_after = '',
        audi_user = '',
        audi_action = '',
        audi_before = '',
        audi_client = '',
        audi_ip = '',
        audi_view = '',
        audi_date = ''
    ) {
        this.audi_id = audi_id;
        this.audi_action = audi_action;
        this.audi_after = audi_after;
        this.audi_before = audi_before;
        this.audi_client = audi_client;
        this.audi_date = audi_date;
        this.audi_ip = audi_ip;
        this.audi_user = audi_user;
        this.audi_view = audi_view;
    }
}
