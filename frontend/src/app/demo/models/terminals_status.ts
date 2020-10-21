export class TerminalStatus {
    test_id: string;
    test_description: string;


    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie    
    constructor(test_id = '',test_description = ''){
        this.test_id = test_id;
        this.test_description=test_description;
    }

}