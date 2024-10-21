import { Injectable } from '@angular/core';
import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentsService } from '../../environments.service';

@Injectable({
  providedIn: 'root'
})
export class GratificationService {

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
  addGratification = (data: any) => {
      const url = this._api_url.apiUrl + 'store_gratifications';
      return this._http.post(url, data, this.getToken());
  }

  // edit
  editGratification = (slug: string) => {
      const url = this._api_url.apiUrl + 'edit_gratification/' + slug;

      return this._http.get(url, this.getToken());
  }

  // SHOW GRATIFICATION
  showGratification = (slug: string) => {
      const url = this._api_url.apiUrl + 'edit_gratification/' + slug;
      return this._http.get(url, this.getToken());
  }

  // updateDemandePermission
  updateGratification= (slug: any, data: any) => {
      const url = this._api_url.apiUrl + 'update_gratification/' + slug;
      return this._http.post(url, data, this.getToken());
  }

  // deleteDemandePermission
  deleteGratification = (slug: string) => {
      const url = this._api_url.apiUrl + 'destroy_gratification/' + slug;

      return this._http.get(url, this.getToken());
  }

  // get customer permission
  getCustomerAUgmentation = (employe_matricule: any) => {
      const url = this._api_url.apiUrl + 'customers_gratification/' + employe_matricule;
      return this._http.get(url, this.getToken());
  }

  // get  permission
  getGratification = (employe_matricule: any) => {
      const url = this._api_url.apiUrl + 'get_gratification/' + employe_matricule;
      return this._http.get(url, this.getToken());
  }

  // get all permission
  getAllGratification = () => {
      const url = this._api_url.apiUrl + 'get_all_gratifications';
      return this._http.get(url, this.getToken());
  }

}
