export class Incidence {
    inci_id: string;
    inci_type: string;
    inci_date_create: string;
    inci_contac_person: string;
    inci_code_commerce: string;
    inci_term_serial: string;
    inci_term_brand: string;
    inci_term_model: string;
    inci_tecnology: string;
    inci_term_number: string;
    inci_schedule_of_attention: string;
    inci_date_limit_attention: string;
    inci__status_of_visit: string;
    inci_technical: string;
    inci_name_commerce: string;
    inci_priority: string;
    inci_motive: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(inci_id = '', inci_type = '', inci_date_create = '', inci_contac_person = '', inci_code_commerce = '', inci_term_serial = '',
        inci_term_brand = '', inci_term_model = '', inci_tecnology = '', inci_term_number = '', inci_schedule_of_attention = '', inci_date_limit_attention = '', inci__status_of_visit = '',
        inci_technical = '', inci_priority= '', inci_name_commerce= '', inci_motive= '') {
        this.inci_id = inci_id;
        this.inci_type = inci_type;
        this.inci_date_create = inci_date_create;
        this.inci_contac_person = inci_contac_person;
        this.inci_code_commerce = inci_code_commerce;
        this.inci_term_serial = inci_term_serial;
        this.inci_term_brand = inci_term_brand;
        this.inci_term_model = inci_term_model;
        this.inci_tecnology = inci_tecnology;
        this.inci_term_number = inci_term_number;
        this.inci_schedule_of_attention = inci_schedule_of_attention;
        this.inci_date_limit_attention = inci_date_limit_attention;
        this.inci__status_of_visit = inci__status_of_visit;
        this.inci_technical = inci_technical;
        this.inci_name_commerce = inci_name_commerce;
        this.inci_priority = inci_priority;
        this.inci_motive = inci_motive;
    }

}
