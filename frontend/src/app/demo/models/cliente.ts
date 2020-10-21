export class Cliente {
    cli_id: string;
    cli_celular: string;
    cli_direccion: string;
    cli_nombre: string;



    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        cli_id = '',
        cli_celular= '',
        cli_direccion= '',
        cli_nombre= ''
    ) {
        this.cli_id = cli_id;
        this.cli_celular = cli_celular;
        this.cli_direccion = cli_direccion;
        this.cli_nombre = cli_nombre;
    }
}