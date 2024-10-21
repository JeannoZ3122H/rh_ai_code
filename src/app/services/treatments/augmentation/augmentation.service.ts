import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';
import { EnvironmentsService } from '../../environments.service';

@Injectable({
  providedIn: 'root'
})
export class AugmentationService {

  public headers: any;

    constructor(
        private _localStorage: StorageManagerService,
        private _api_url: EnvironmentsService,
        private _http: HttpClient,
    ) { }

    getToken = () => {
        const tokens = this._localStorage.getTokenToStorage();
        this. headers = { headers: { 'Authorization': 'Bearer ' + tokens }};

        return this.headers;
    }


    // send data conges
    addAugments = (data: any) => {
        const url = this._api_url.apiUrl + 'store_augmentation';
        return this._http.post(url, data, this.getToken());
    }

    // edit
    editDemandePermission = (slug: string) => {
        const url = this._api_url.apiUrl + 'edit_augmentation/' + slug;

        return this._http.get(url, this.getToken());
    }

    // SHOW PERMISSION
    showPermission = (slug: string) => {
        const url = this._api_url.apiUrl + 'edit_permission/' + slug;
        return this._http.get(url, this.getToken());
    }

    // updateDemandePermission
    updateAugmentation = (slug: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_augmentation/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    // deleteDemandePermission
    deleteAugmentation = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_augmentation/' + slug;

        return this._http.get(url, this.getToken());
    }

    // get customer permission
    // getCustomerAUgmentation = (employe_matricule: any) => {
    //     const url = this._api_url.apiUrl + 'customers_augmentation/' + employe_matricule;
    //     return this._http.get(url, this.getToken());
    // }

    // get  Augmentation
    getAugments = (employe_matricule: any) => {
        const url = this._api_url.apiUrl + 'get_augmentation/' + employe_matricule;
        return this._http.get(url, this.getToken());
    }

    // get all permission
    getAllAugmentation = () => {
        const url = this._api_url.apiUrl + 'get_all_augmentation';
        return this._http.get(url, this.getToken());
    }


}
