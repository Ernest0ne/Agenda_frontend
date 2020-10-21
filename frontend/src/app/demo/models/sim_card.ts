export class SimCard {

    sica_serial: string;
	sica_brand: string;
	sica_status: string;
	sica_location: string;

    constructor(sica_serial = '', sica_brand = '',sica_status = '',sica_location = '') {
        this.sica_serial = sica_serial;
        this.sica_brand = sica_brand;
        this.sica_status = sica_status;
        this.sica_location = sica_location;
    }
}