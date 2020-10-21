export class SimStatus {

	scst_id: string;
	scst_code: string;
	scst_description: string;

    constructor(scst_id = '', scst_code = '',scst_description = '') {
        this.scst_id = scst_id;
        this.scst_code = scst_code;
        this.scst_description = scst_description;
    }
}