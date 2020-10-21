export class Commerce {
    comm_id: string;
    comm_uniqe_code: string;
    comm_name: string;
    comm_nit: string;
    comm_priority: string;
    comm_country: string;
    comm_city: string;
    comm_address: string;
    comm_route_code: string;
    comm_phone: string;
    comm_cellphone: string;
    comm_email: string;
    comm_schedule_attention: string;
    comm_contact_person: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        comm_id = '',
        comm_uniqe_code = '',
        comm_name = '',
        comm_nit = '',
        comm_country = '',
        comm_address = '',
        comm_phone = '',
        comm_cellphone = '',
        comm_email = '',
        comm_schedule_attention = '',
        comm_contact_person = '',
        comm_route_code = ''
    ) {
        this.comm_id = comm_id;
        this.comm_uniqe_code = comm_uniqe_code;
        this.comm_name = comm_name;
        this.comm_nit = comm_nit;
        this.comm_country = comm_country;
        this.comm_city = comm_country;
        this.comm_address = comm_address;
        this.comm_route_code = comm_route_code;
        this.comm_phone = comm_phone;
        this.comm_cellphone = comm_cellphone;
        this.comm_email = comm_email;
        this.comm_schedule_attention = comm_schedule_attention;
        this.comm_contact_person = comm_contact_person;
    }
}
