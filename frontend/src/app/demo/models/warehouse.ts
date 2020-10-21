export class Warehouse {
    ware_id: string;
    ware_id_warehouse: string;
    ware_city: string;
    ware_name: string;
    ware_country: string;
    ware_responsable: string;
    ware_status: string;
    ware_client: string;
    ware_email: string;
    ware_phone: string;
    ware_position: string;
    ware_type: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        ware_id = '',
        ware_name = '',
        ware_country = '',
        ware_responsable = '',
        ware_city = '',
        ware_client = '',
        ware_email = '',
        ware_phone = '',
        ware_position = '',
        ware_status = '',
        ware_id_warehouse = '',
        ware_type = ''
    ) {
        this.ware_id = ware_id;
        this.ware_id_warehouse = ware_id_warehouse;
        this.ware_city = ware_city;
        this.ware_name = ware_name;
        this.ware_country = ware_country;
        this.ware_responsable = ware_responsable;
        this.ware_client = ware_client;
        this.ware_email = ware_email;
        this.ware_phone = ware_phone;
        this.ware_position = ware_position;
        this.ware_status = ware_status;
        this.ware_type = ware_type;
    }
}
