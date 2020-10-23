
export interface Adapter<T> {
    // Método para acoplar las respuestas del backend al frontend cuando son listados
    adaptList(list: any): T[];
    // Método para acoplar las respuestas del backend al frontend cuando son objetos
    adaptObjectReceive(obj: any): T;
    // Método para acoplar las respuestas del frontend al backend para objetos
    adaptObjectSend(obj: any): T;
    // Método para acoplar las respuestas del frontend al backend para listados
    adaptListSend(list: any): T;
}