export class Cliente {
    pro_nombre: string;
    pro_apellido: string;
    pro_correo: string;
    pro_facultad: string;
    pro_departamento: string;



    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        pro_nombre = "",
        pro_apellido = "",
        pro_correo = "",
        pro_facultad = "",
        pro_departamento = "",
    ) {
        this.pro_nombre = pro_nombre;
        this.pro_apellido = pro_apellido;
        this.pro_correo = pro_correo;
        this.pro_facultad = pro_facultad;
        this.pro_departamento = pro_departamento;
    }
}