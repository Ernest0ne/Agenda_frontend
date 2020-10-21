export class Empleado {
    emp_id: string;
    emp_celular: string;
    emp_direccion: string;
    emp_nombre: string;
    emp_area: string;



    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        emp_id = '',
        emp_celular= '',
        emp_direccion= '',
        emp_nombre= '',
        emp_area= ''
    ) {
        this.emp_id = emp_id;
        this.emp_celular = emp_celular;
        this.emp_direccion = emp_direccion;
        this.emp_nombre = emp_nombre;
        this.emp_area = emp_area
    }
}