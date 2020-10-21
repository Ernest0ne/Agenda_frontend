export class TerminalBrands {
    public tebr_id: string;
    public tebr_name: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie
    constructor(tebr_id = '', tebr_name = '') {
        this.tebr_id = tebr_id;
        this.tebr_name = tebr_name;
    }
}
