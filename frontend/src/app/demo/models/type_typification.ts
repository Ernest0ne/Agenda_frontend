export class Types {
    tyty_name: string;
    tyty_date_register: string;
    tyty_register_by: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        tyty_name = '',
        tyty_date_register = '',
        tyty_register_by = ''
    ) {
        this.tyty_name = tyty_name;
        this.tyty_date_register = tyty_date_register;
        this.tyty_register_by = tyty_register_by;
    }
}
