export class City {
    city_id: string;
    city_name: string;
    city_country: string;


    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie 
    
    constructor(city_id = '', city_name = '', city_country = '') {
        this.city_id = city_id;
        this.city_name = city_name;
        this.city_country = city_country;
    }

}