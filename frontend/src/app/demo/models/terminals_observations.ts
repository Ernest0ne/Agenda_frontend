export class TerminalObservations {
    public teob_id: string;
    public teob_description: string;
    public teob_fecha: string;
    public teob_id_user: string;
    public teob_id_photo: string;
    public teob_serial_terminal: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie
    constructor(
        teob_id = '',
        teob_description = '',
        teob_fecha = '',
        teob_id_user = '',
        teob_id_photo = '',
        teob_serial_terminal = ''
    ) {
        this.teob_id = teob_id;
        this.teob_description = teob_description;
        this.teob_fecha = teob_fecha;
        this.teob_id_user = teob_id_user;
        this.teob_id_photo = teob_id_photo;
        this.teob_serial_terminal = teob_serial_terminal;
    }
}
