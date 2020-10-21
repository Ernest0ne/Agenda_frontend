export class TerminalTecnology {
    public tech_code: string;
    public tech_description: string;

    //realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie
    constructor(tech_code = "", tebr_description = "") {
        this.tech_code = tech_code;
        this.tech_description = tebr_description;
    }
    // LE HACEN FALTA LAS VALIDACIONES ESTA FALSE
}
