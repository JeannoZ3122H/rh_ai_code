import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentsService {

    constructor() { }

    apiUrl : any = 'https://api-rh.alerteinfo-mairie.com/api/v1/';

    // apiUrl : any = 'http://127.0.0.1:8000/api/v1/';
}
