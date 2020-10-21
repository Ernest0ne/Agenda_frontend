'use strict';
export class urlBackend {
    url: string;
    appIdMap: string;
    appCodeMap: string;
    message: string;

    // realizamos un constructor para cargar la url del backend en todas las llamadas a servicios

    /* url backend local = 'http://localhost:3000/PolarisCore/' */
    /* url backend qqta = 'http://181.52.84.254:3000/PolarisCore/' */
    /* url backend aws = 'http://100.25.214.91:3000/PolarisCore/' */
    /* url backend carlos para movil = 'http://10.39.151.113:3000/PolarisCore/' */

    constructor(url = 'http://localhost:3000/PolarisCore/') {
        this.url = url;
        this.appIdMap = 'VV9O1VLSXz8pRNjg602T';
        this.appCodeMap = 'DezhHjCs8WgKEA_oyijc2Q';
        this.message = '';
    }
}
