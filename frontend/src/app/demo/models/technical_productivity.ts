export class TechnicalProductivity {
    tepro_id: string;
    tepro_country: string;
    tepro_city: string;
    tepro_quantity_services: string;
    tepro_date_register: string;
    tepro_register_by: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        tepro_id = '',
        tepro_country = '',
        tepro_city = '',
        tepro_quantity_services = '',
        tepro_date_register = '',
        tepro_register_by = ''
    ) {
        this.tepro_id = tepro_id;
        this.tepro_country = tepro_country;
        this.tepro_city = tepro_city;
        this.tepro_date_register = tepro_date_register;
        this.tepro_register_by = tepro_register_by;
        this.tepro_quantity_services = tepro_quantity_services;
    }
}
