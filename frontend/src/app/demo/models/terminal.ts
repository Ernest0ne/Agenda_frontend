export class Terminal {
    term_serial: string;
    term_brand: string;
    term_model: string;
    term_technology: string;
    term_security_seal: string;
    term_mk: string;
    term_buy_date: string;
    term_start_date_warranty: string;
    term_warranty_time: string;
    term_date_finish: string;
    term_status: string;
    term_localication: string;
    term_imei: string;
    term_num_terminal: string;
    term_status_temporal: string;
    term_user_reparation: string;
    term_date_reception: string;
    term_date_ans: string;
    term_warranty_type: string;
    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        term_serial = '',
        term_brand = '',
        term_model = '',
        term_technology = '',
        term_security_seal = '',
        term_mk = '',
        term_buy_date = '',
        term_start_date_warranty = '',
        term_warranty_time = '0',
        term_date_finish = '',
        term_status = '',
        term_localication = '',
        term_imei = '',
        term_num_terminal = '',
        term_status_temporal = 'N/A',
        term_user_reparation = '',
        term_date_reception = '',
        term_date_ans = '',
        term_warranty_type = ''
    ) {
        this.term_serial = term_serial;
        this.term_brand = term_brand;
        this.term_model = term_model;
        this.term_technology = term_technology;
        this.term_security_seal = term_security_seal;
        this.term_mk = term_mk;
        this.term_buy_date = term_buy_date;
        this.term_start_date_warranty = term_start_date_warranty;
        this.term_warranty_time = term_warranty_time;
        this.term_date_finish = term_date_finish;
        this.term_status = term_status;
        this.term_localication = term_localication;
        this.term_imei = term_imei;
        this.term_num_terminal = term_num_terminal;
        this.term_status_temporal = term_status_temporal;
        this.term_user_reparation = term_user_reparation;
        this.term_date_reception = term_date_reception;
        this.term_date_ans = term_date_ans;
        this.term_warranty_type = term_warranty_type;
    }
}
