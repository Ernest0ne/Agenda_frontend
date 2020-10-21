export class Country {
    coun_id: string;
    coun_name: string;
    coun_indicative: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(coun_id = '', coun_name = '', coun_indicative = '') {
        this.coun_id = coun_id;
        this.coun_name = coun_name;
        this.coun_indicative = coun_indicative;
    }
}
