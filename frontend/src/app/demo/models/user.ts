export class User {
    user_identification: string;
    user_address: string;
    user_email: string;
    user_id_user: string;
    user_immediate_boss: string;
    user_location: string;
    user_locations: string;
    user_login: string;
    user_name: string;
    user_password: string;
    user_phone: string;
    user_photo: string;
    user_position: string;
    user_role: string;
    user_state: string;
    user_session: string;

    // realizamos un constructor para el modelos para que tenga valores por defecto cuando se instancie

    constructor(
        user_identification = '',
        user_address = '',
        user_email = '',
        user_id_user = '',
        user_immediate_boss = '',
        user_location = '',
        user_locations = '',
        user_login = '',
        user_name = '',
        user_password = '',
        user_phone = '',
        user_photo = '',
        user_position = '',
        user_role = '',
        user_state = '',
        user_session = ''
    ) {
        this.user_identification = user_identification;
        this.user_address = user_address;
        this.user_email = user_email;
        this.user_id_user = user_id_user;
        this.user_immediate_boss = user_immediate_boss;
        this.user_location = user_location;
        this.user_locations = user_locations;
        this.user_login = user_login;
        this.user_name = user_name;
        this.user_password = user_password;
        this.user_phone = user_phone;
        this.user_photo = user_photo;
        this.user_position = user_position;
        this.user_role = user_role;
        this.user_state = user_state;
        this.user_session = user_session;
    }
}
