export class Cliente {

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        public pro_nombre: string,
        public pro_apellido: string,
        public pro_correo: string,
        public pro_facultad: string,
        public pro_departamento: string,
    ) { }
}