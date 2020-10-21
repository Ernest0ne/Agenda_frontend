import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Document } from '../models/document';

@Injectable({
    providedIn: 'root'
})
export class SokectIoService {
    currentDocument = this.socket.fromEvent<Document>('document');
    documents = this.socket.fromEvent<string[]>('documents');
    sesionExpireClient = this.socket.fromEvent<Object>('sesionExpireClient');

    constructor(private socket: Socket) {}

    getDocument(id: string) {
        this.socket.emit('getDoc', id);
    }

    IoListarNotificaciones() {
        this.socket.emit('getNotificaciones', { id: this.docId(), doc: '' });
    }

    editDocument(document: Document) {
        this.socket.emit('editDoc', document);
    }

    connectionSuscribe(data) {
        this.socket.connect();
        this.socket.emit('suscribeById', data);
    }

    logout() {
        this.socket.disconnect();
    }

    sendNotification(user) {
        this.socket.emit('onNotification', user);
    }

    private docId() {
        let text = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }

        return text;
    }
}
