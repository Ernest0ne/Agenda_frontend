export class Material {
    mat_id: string;
    mat_nombre: string;
    mat_color: string;
    mat_cantidad: string;
    mat_tipo: string;



    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        mat_id = '',
        mat_nombre= '',
        mat_color= '',
        mat_cantidad= '',
        mat_tipo= '',
    ) {
        this.mat_id = mat_id;
        this.mat_nombre = mat_nombre;
        this.mat_color = mat_color;
        this.mat_cantidad = mat_cantidad;
        this.mat_tipo = mat_tipo;
    }
}