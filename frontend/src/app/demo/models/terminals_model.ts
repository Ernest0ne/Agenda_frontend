export class TerminalModels {
    public temo_id: string;
    public temo_name: string;
    public temo_brand: string;
    public temo_photo: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie
    constructor(
        temo_id = '',
        temo_name = '',
        temo_brand = '',
        temo_photo = ''
    ) {
        this.temo_id = temo_id;
        this.temo_name = temo_name;
        this.temo_brand = temo_brand;
        this.temo_photo = temo_photo;
    }
}
